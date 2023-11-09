/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

// asyncthunk for fetching scrap details
export const fetchScrap = createAsyncThunk('/scraprates', async () => {
  const response = await api.pricelist();
  return response;
});

// create the scrap details slice
export const scrapSlice = createSlice({
  name: 'scrapDetails',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: {
    [fetchScrap.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchScrap.fulfilled]: (state, action) => {
      state.loading = false;
      // Exclude the non-serializable headers and config properties
      const { headers, config, ...serializableData } = action.payload;
      state.data = serializableData;
    },
    [fetchScrap.error]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
