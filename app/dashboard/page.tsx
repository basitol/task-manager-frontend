import {Suspense} from 'react';
import {CreateTaskDialog} from './components/create-task-dialog';
import {TasksTable} from './components/tasks-table';
import {Skeleton} from '@/components/ui/skeleton';
import {Header} from '@/components/layout/header';

function TasksTableSkeleton() {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-10 w-[100px]' />
      </div>
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className='h-16 w-full' />
      ))}
    </div>
  );
}

export default async function DashboardPage() {
  return (
    <>
      <Header />
      <div className='container mx-auto py-10'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Tasks</h1>
          <CreateTaskDialog />
        </div>
        <Suspense fallback={<TasksTableSkeleton />}>
          <TasksTable />
        </Suspense>
      </div>
    </>
  );
}
