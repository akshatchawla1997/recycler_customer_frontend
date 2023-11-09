/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const fetchWalletHistoryData = createAsyncThunk('/getuserdetails', async (id) => {
  const response = await api.getWalletHistoryDetails(id);
  return response;
});

export const getWalletHistorySlice = createSlice({
  name: 'getWalletHistoryDetails',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: {
    [fetchWalletHistoryData.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchWalletHistoryData.fulfilled]: (state, action) => {
      state.loading = false;
      const { headers, config, ...serializableData } = action.payload;
      state.data = serializableData;
    },
    [fetchWalletHistoryData.error]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default getWalletHistorySlice.reducer;
