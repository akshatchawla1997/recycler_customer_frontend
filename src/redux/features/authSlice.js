/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, applyMiddleware } from '@reduxjs/toolkit';
import * as api from '../api';

export const register = createAsyncThunk('/user/', async ({ FormData }, { rejectWithValue }) => {
  try {
    const response = await api.signUp(FormData);
    return response;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const verifyOtp = createAsyncThunk('user/verifyOtp', async ({ id, otp }, { rejectWithValue }) => {
  try {
    const response = await verifyOtp(id, otp);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const regenerateOtp = createAsyncThunk('user/regenerateOtp', ({ id }, { rejectWithValue }) => applyMiddleware
  .regenerateOtp({ id })
  .then((response) => response)
  .catch((error) => rejectWithValue(error)));

export const loginUser = createAsyncThunk('/accounts/login', async ({ signInData }, { rejectWithValue }) => {
  try {
    const response = await api.login(signInData);
    const { headers } = response;
    const serializedHeaders = {
      'content-length': headers['content-length'],
      'content-type': headers['content-type'],
    };
    const serializedResponse = {
      data: response.data,
      headers: serializedHeaders,
    };
    return serializedResponse;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: '',
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [verifyOtp.pending]: (state, action) => {
      state.loading = true;
    },
    [verifyOtp.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [verifyOtp.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default authSlice.reducer;
