import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { walletHistory } from '../api';

export const walletHistoryData = createAsyncThunk('/transaction/wallet', async (transactionData) => {
  const response = await walletHistory(transactionData);
  return response.data;
});

export const walletHistorySlice = createSlice(
  {
    name: 'walletHistory',
    initialState: { data: null, loading: false, error: null },
    reducers: {},
    extraReducers: {
    // eslint-disable-next-line no-unused-vars
      [walletHistoryData.pending]: (state, action) => {
        state.loading = true;
      },
      [walletHistoryData.fulfilled]: (state, action) => {
        state.loading = false;
        state.data = action.payload;
      },
      [walletHistoryData.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  },
);

export default walletHistorySlice.reducer;
