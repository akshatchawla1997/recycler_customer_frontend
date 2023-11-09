import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const bankData = createAsyncThunk('/transfertobank', async (formData) => {
  const response = await api.bankDetails(formData);
  return response;
});

export const bankDataSlice = createSlice({
  name: 'bankDetails',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: {
    // eslint-disable-next-line no-unused-vars
    [bankData.pending]: (state, action) => {
      state.loading = true;
    },
    [bankData.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [bankData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default bankDataSlice.reducer;
