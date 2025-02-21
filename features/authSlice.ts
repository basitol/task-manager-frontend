import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from '@/services/api';
import type {AuthResponse} from '@/services/api';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(api.endpoints.login.matchPending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        api.endpoints.login.matchFulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.access_token;
          localStorage.setItem('token', action.payload.access_token);
        },
      )
      .addMatcher(api.endpoints.login.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addMatcher(api.endpoints.register.matchPending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        api.endpoints.register.matchFulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.user = action.payload.user;
        },
      )
      .addMatcher(api.endpoints.register.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Registration failed';
      })
      .addMatcher(
        api.endpoints.logout.matchFulfilled,
        (state) => {
          state.user = null;
          state.token = null;
          state.error = null;
          localStorage.removeItem('token');
        }
      );
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
