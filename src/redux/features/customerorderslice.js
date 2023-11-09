/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

// asyncthunk for fetching scrap details
export const customerOrderDetails = createAsyncThunk('/customer-details', async (id) => {
  const response = await api.customerDetails(id);
  return response;
});

// create the scrap details slice
export const customerDetailsSlice = createSlice({
  name: 'scrapDetails',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: {
    [customerOrderDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [customerOrderDetails.fulfilled]: (state, action) => {
      state.loading = false;
      // Exclude the non-serializable headers and config properties
      const { headers, config, ...serializableData } = action.payload;
      state.data = serializableData;
    },
    [customerOrderDetails.error]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
