'use client';

export default function Footer() {
  return (
    <footer className='fixed bottom-0 w-full p-4 text-center text-sm text-muted-foreground'>
      © {new Date().getFullYear()} Task Manager. All rights reserved.
    </footer>
  );
} 