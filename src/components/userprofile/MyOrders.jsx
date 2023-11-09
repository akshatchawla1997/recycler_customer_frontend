/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import Error from '../Error';
import { customerOrderDetails } from '../../redux/features/customerorderslice';
import { fetchOrderList } from '../../redux/features/fetchOrderSlice';
import { fetchUserDetails } from '../../redux/features/userDetailsSlice';
import RequestedList from './RequestedList';
import CompletedList from './CompletedList';

function MyOrders() {
  const [userOtp, setUserOtp] = useState();
  const userid = localStorage.getItem('userid');
  const dispatch = useDispatch();
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    dispatch(fetchOrderList())?.then((response) => {});
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchUserDetails(userid))?.then((response) => {
      setUserOtp(response.payload.data.pickup_otp);
    });
  }, []);
  const { loading, data: orderData, error } = useSelector((state) => state.orderDetails);
  if (loading) {
    <Loader />;
  } else if (error) {
    <Error />;
  }

  const myItem = orderData?.data?.filter((item) => item.user_id.toString() === userid);
  const requestedList = [];
  const completedList = [];
  if (myItem) {
    myItem.forEach((item) => {
      if (item.order_status === 'completed' || item.order_status === 'complete') {
        completedList.push(item);
      } else {
        requestedList.push(item);
      }
    });
  }
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    dispatch(customerOrderDetails(userid))?.then((response) => {});
  }, [dispatch]);
  return (
    <div>
      <div className='w-full text-center '>
        <div className='w-11/12 inline-block'>
          <div className='flex justify-between'>
            <h2 className='text-2xl text-left mt-24  font-bold mb-10'>Live Orders</h2>
            <p className='text-2xl text-left mt-24'>
              Otp for All the Order
              {' '}
              <span className='text-2xl text-left mt-24  font-bold mb-10'>{userOtp}</span>
            </p>
          </div>
          <div className=' -z-10 relative overflow-x-auto shadow-md sm:rounded-lg'>
            <RequestedList requestedList={requestedList} />
          </div>
        </div>
      </div>
      <div className='w-full text-center mb-10'>
        <div className='w-11/12 inline-block'>
          <h2 className='text-2xl  mt-24 text-center font-bold mb-10'>Order History</h2>
          <div className='-z-10 relative overflow-x-auto shadow-md sm:rounded-lg'>
            <CompletedList completedList={completedList} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyOrders;
