import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {Task, TasksResponse, CreateTaskInput, TasksQueryParams} from '@/types/task';

interface User {
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  message: string;
  access_token: string;
  status: boolean;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: headers => {
      const token = typeof window !== 'undefined' 
        ? localStorage.getItem('token')
        : null;
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  tagTypes: ['Tasks'],
  endpoints: builder => ({
    register: builder.mutation<
      AuthResponse,
      {
        name: string;
        email: string;
        password: string;
      }
    >({
      query: credentials => ({
        url: '/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation<
      AuthResponse,
      {
        email: string;
        password: string;
      }
    >({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getTasks: builder.query<TasksResponse, TasksQueryParams | void>({
      query: (params) => ({
        url: '/tasks',
        params: {
          page: params?.page ?? 1,
          per_page: params?.per_page ?? 10,
          sort_by: params?.sort_by,
          sort_order: params?.sort_order,
          status: params?.status,
        },
      }),
      providesTags: ['Tasks'],
    }),
    updateTask: builder.mutation<Task, Partial<Task> & Pick<Task, 'id'>>({
      query: ({id, ...patch}) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Tasks'],
    }),
    deleteTask: builder.mutation<void, number>({
      query: id => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
    createTask: builder.mutation<Task, CreateTaskInput>({
      query: newTask => ({
        url: '/tasks',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: ['Tasks'],
    }),
    completeTask: builder.mutation<Task, number>({
      query: id => ({
        url: `/tasks/${id}/complete`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Tasks'],
    }),
    logout: builder.mutation<{message: string}, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useCreateTaskMutation,
  useCompleteTaskMutation,
  useLogoutMutation,
} = api;
