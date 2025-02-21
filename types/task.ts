export interface Task {
  id: number;
  task_name: string;
  description: string;
  due_date: string;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
}

export type TaskStatus = 'Pending' | 'In-progress' | 'Completed';

export interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number;
  to: number;
}

export interface TasksResponse {
  status: string;
  data: {
    tasks: Task[];
    pagination: Pagination;
  };
  message: string;
}

export interface CreateTaskInput {
  task_name: string;
  description: string;
  due_date: string;
  status: TaskStatus;
}

export interface TasksQueryParams {
  page?: number;
  per_page?: number;
  sort_by?: 'due_date' | 'task_name' | 'status' | 'created_at';
  sort_order?: 'asc' | 'desc';
  status?: TaskStatus;
} 