'use client';

import {
  useGetTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useCompleteTaskMutation,
} from '@/services/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {MoreHorizontal, Trash, CheckCircle, ArrowUpDown} from 'lucide-react';
import {toast} from 'sonner';
import {TaskStatus} from '@/types/task';
import {useState} from 'react';

export function TasksTable() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<'status' | 'due_date' | 'task_name' | 'created_at' | undefined>();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | undefined>();

  const {data: tasksData, isLoading} = useGetTasksQuery({
    page,
    per_page: 10,
    sort_by: sortBy,
    sort_order: sortOrder,
    status: statusFilter,
  });
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [completeTask] = useCompleteTaskMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id).unwrap();
      toast.success('Task deleted successfully');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to delete task';
      toast.error(errorMessage);
    }
  };

  const handleStatusChange = async (id: number, status: TaskStatus) => {
    try {
      await updateTask({id, status}).unwrap();
      toast.success('Task status updated');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to update task';
      toast.error(errorMessage);
    }
  };

  const handleComplete = async (id: number) => {
    try {
      await completeTask(id).unwrap();
      toast.success('Task marked as completed');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to complete task';
      toast.error(errorMessage);
    }
  };

  const handleSort = (column: 'status' | 'due_date' | 'task_name' | 'created_at') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='w-full'>
      <div className='flex justify-end mb-4 gap-2'>
        <select
          className='border rounded p-1'
          value={statusFilter || ''}
          onChange={e => setStatusFilter(e.target.value as TaskStatus || undefined)}>
          <option value=''>All Status</option>
          <option value='Pending'>Pending</option>
          <option value='In-progress'>In Progress</option>
          <option value='Completed'>Completed</option>
        </select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant='ghost'
                onClick={() => handleSort('task_name')}>
                Task Name
                {sortBy === 'task_name' && (
                  <ArrowUpDown className='ml-2 h-4 w-4' />
                )}
              </Button>
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead>
              <Button
                variant='ghost'
                onClick={() => handleSort('due_date')}>
                Due Date
                {sortBy === 'due_date' && (
                  <ArrowUpDown className='ml-2 h-4 w-4' />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant='ghost'
                onClick={() => handleSort('status')}>
                Status
                {sortBy === 'status' && (
                  <ArrowUpDown className='ml-2 h-4 w-4' />
                )}
              </Button>
            </TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasksData?.data.tasks.map(task => (
            <TableRow key={task.id}>
              <TableCell>{task.task_name}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                {new Date(task.due_date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <select
                  value={task.status}
                  onChange={e =>
                    handleStatusChange(task.id, e.target.value as TaskStatus)
                  }
                  className='border rounded p-1'>
                  <option value='Pending'>Pending</option>
                  <option value='In-progress'>In Progress</option>
                  <option value='Completed'>Completed</option>
                </select>
              </TableCell>
              <TableCell className='text-right'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                      <span className='sr-only'>Open menu</span>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {task.status !== 'Completed' && (
                      <DropdownMenuItem onClick={() => handleComplete(task.id)}>
                        <CheckCircle className='mr-2 h-4 w-4' />
                        Mark Complete
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => handleDelete(task.id)}
                      className='text-red-600'>
                      <Trash className='mr-2 h-4 w-4' />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className='flex items-center justify-between py-4'>
        <div className='text-sm text-muted-foreground'>
          Showing {tasksData?.data.pagination.from} to{' '}
          {tasksData?.data.pagination.to} of{' '}
          {tasksData?.data.pagination.total} entries
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}>
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setPage(page + 1)}
            disabled={page >= (tasksData?.data.pagination.last_page ?? 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
