'use client';

import {useRouter} from 'next/navigation';
import {Card, CardHeader, CardContent, CardFooter} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import {toast} from 'sonner';
import {useLoginMutation} from '@/services/api';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LoginPage() {
  const router = useRouter();
  const [login, {isLoading}] = useLoginMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login(values).unwrap();
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Error', {
        description: 'Invalid credentials. Please try again.',
      });
      console.error(error);
    }
  }

  return (
    <div className='container mx-auto flex items-center justify-center min-h-screen py-8'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <h2 className='text-2xl font-bold text-center'>Login</h2>
          <p className='text-sm text-muted-foreground text-center'>
            Enter your credentials to access your account
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='Enter your email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Enter your password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Sign In'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex flex-col space-y-2'>
          <div className='text-sm text-center text-muted-foreground'>
            Don&apos;t have an account?{' '}
            <Link
              href='/register'
              className='text-primary underline-offset-4 hover:underline'>
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
