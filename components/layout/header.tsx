'use client';

import {LogoutButton} from '@/components/auth/logout-button';

export function Header() {
  return (
    <header className='border-b'>
      <div className='container mx-auto flex h-16 items-center justify-between'>
        <h2 className='text-lg font-semibold'>Task Manager</h2>
        <nav>
          <LogoutButton />
        </nav>
      </div>
    </header>
  );
} 