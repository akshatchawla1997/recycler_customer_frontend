/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const fetchUserDetails = createAsyncThunk('/userdetails', async (id) => {
  const response = await api.userDetails(id);
  return response;
});

export const userSlice = createSlice({
  name: 'userdetails',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: {
    [fetchUserDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUserDetails.fulfilled]: (state, action) => {
      state.loading = false;
      const { headers, config, ...serializableData } = action.payload;
      state.data = serializableData;
    },
    [fetchUserDetails.error]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
