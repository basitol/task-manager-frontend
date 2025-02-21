import {TaskStatus} from '@/types/task';
import {z} from 'zod';

const formSchema = z.object({
  task_name: z.string().min(1, 'Task name is required'),
  description: z.string().min(1, 'Description is required'),
  due_date: z.string().min(1, 'Due date is required'),
  status: z.enum(['Pending', 'In-progress', 'Completed'] as const),
}); 