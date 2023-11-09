import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './features/authSlice';
import { scrapSlice } from './features/scraprateSlice';
import { userSlice } from './features/userDetailsSlice';
import { customerDetailsSlice } from './features/customerorderslice';
import { orderListSlice } from './features/fetchOrderSlice';
import { walletHistorySlice } from './features/walletHistorySlice';
import { getWalletHistorySlice } from './features/getWalletHistorySlice';

export default configureStore({
  reducer: {
    auth: AuthReducer,
    orderDetails: orderListSlice.reducer,
    scrapDetails: scrapSlice.reducer,
    userSlice: userSlice.reducer,
    customerdetails: customerDetailsSlice.reducer,
    walletHistory: walletHistorySlice.reducer,
    walletHistoryDetails: getWalletHistorySlice.reducer,
  },
});
