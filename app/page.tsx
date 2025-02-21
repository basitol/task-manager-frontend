import Link from 'next/link';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-8'>
      <main className='flex flex-col items-center gap-8 max-w-2xl'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold mb-4'>Welcome to Task Manager</h1>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            Organize your tasks efficiently and boost your productivity
          </p>
        </div>

        <div className='flex gap-4 mt-6'>
          <Link
            href='/login'
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
            Get Started
          </Link>
          <Link
            href='/about'
            className='px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'>
            Learn More
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
