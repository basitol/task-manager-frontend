import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  due_date: string | null;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const API_URL = 'http://127.0.0.1:8000/api';

export const fetchTasks = createAsyncThunk(
  'tasks/fetch',
  async (token: string) => {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
  },
);

export const addTask = createAsyncThunk(
  'tasks/add',
  async ({token, task}: {token: string; task: Partial<Task>}) => {
    const response = await axios.post(`${API_URL}/tasks`, task, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
  },
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      });
  },
});

export default taskSlice.reducer;
