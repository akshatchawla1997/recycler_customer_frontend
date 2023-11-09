import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.kabadijee.com/',
  // baseURL: 'http://localhost:8000/',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    // req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const orderList = () => API.get('orders/');
export const signUp = (FormData) => API.post('/user/', FormData);
export const verifyOtp = (id, newOtp) => API.patch(`user/${id}/verify_otp/`, { otp: newOtp });
export const regenerateOtp = ({ id }) => API.patch(`/user/${id}/regenerate_otp/`);
export const login = (signInData) => API.post('/accounts/login/', signInData);
export const logout = (authToken) => API.post('user/logout/', authToken);
export const userDetails = (id) => API.get(`/user/${id}/`);
export const pricelist = () => API.get('/orders/item-rates/');
export const pickupRequest = (FormData) => API.post('orders/api/pickup-requests/', FormData);
export const updateUserApi = (authToken, FormData) => API.put('accounts/update-user/', FormData, {
  headers: {
    Authorization: `Token ${authToken}`,
  },
});
export const customerDetails = (id) => API.get(`accounts/customer-pickup-details/${id}`);
export const walletDetails = (data) => API.post('transactions/wallet/', data);
export const getWalletDetails = () => API.get('transactions/wallet/');
export const bankDetails = (FormData) => API.post('transactions/bank-details/', FormData);
export const walletHistory = (formData) => API.post('transactions/wallet-history/', formData);
export const getWalletHistoryDetails = (id) => API.get(`/transactions/wallet-history/get_history_by_wallet_id/?wallet_id=${id}`);
