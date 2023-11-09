/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../redux/features/userDetailsSlice';
import Loader from '../Loader';

function UserInfo() {
  const userid = localStorage.getItem('userid');
  const dispatch = useDispatch();
  const { loading, data: userSlice, error } = useSelector((state) => state.userSlice);
  const userDetailsData = userSlice?.data;
  useEffect(() => {
    dispatch(fetchUserDetails(userid)).then((response) => {});
  }, [dispatch, userid]);
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }
  return (
    <div className='flx grid grid-cols-1 md:grid-cols-2 gap-4'>
      <label htmlFor='name' className=''>
        <span className='font-semibold text-xl'>Name:</span>
        {' '}
        <span className=''>{userDetailsData?.name}</span>
      </label>
      <label htmlFor='email' className=''>
        <span className='font-semibold text-xl'>Email-Id:</span>
        {' '}
        <span className=''>{userDetailsData?.email}</span>
      </label>
      <label htmlFor='mobile'>
        <span className='font-semibold text-xl'> Mobile Number:</span>
        {' '}
        <span>{userDetailsData?.phone_number}</span>
      </label>
    </div>
  );
}

export default UserInfo;
