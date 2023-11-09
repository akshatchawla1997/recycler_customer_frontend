/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const initialPickupState = {
  user: localStorage.getItem('userid'),
  pickup_date: '',
  pickup_time: '',
  flat_number: '',
  area: '',
  landmark: '',
  city: '',
  state: '',
  pincode: '',
  pickup_request_items: [],
};

export const orderPickup = createAsyncThunk('pickup/orderPickup', async (formData, { rejectWithValue }) => {
  try {
    const response = await api.pickupRequest(formData);

    return response;
  } catch (e) {
    return rejectWithValue(e?.response?.data);
  }
});

const pickupSlice = createSlice({
  name: 'pickup',
  initialState: {
    data: null,
    error: '',
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(orderPickup.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderPickup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload;
      })
      .addCase(orderPickup.rejected, (state, action) => {
        state.loading = false;
        state.data = { ...action.payload, headers: undefined };
      });
  },
});

export default pickupSlice.reducer;
