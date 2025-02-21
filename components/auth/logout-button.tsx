'use client';

import {Button} from '@/components/ui/button';
import {useLogoutMutation} from '@/services/api';
import {useDispatch} from 'react-redux';
import {logout} from '@/features/authSlice';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';

export function LogoutButton() {
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      router.push('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      // Still logout locally even if API fails
      dispatch(logout());
      router.push('/login');
    }
  };

  return (
    <Button variant="ghost" onClick={handleLogout}>
      Logout
    </Button>
  );
} 