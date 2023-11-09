import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderList } from '../api';

export const fetchOrderList = createAsyncThunk(
  'fetchOrders/fetch',
  async () => {
    const response = await orderList();
    return response.data;
  },
);

export const orderListSlice = createSlice({
  name: 'orderDetails',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: {
    // eslint-disable-next-line no-unused-vars
    [fetchOrderList.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchOrderList.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchOrderList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default orderListSlice.reducer;
