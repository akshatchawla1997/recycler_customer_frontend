/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';
import { BiWalletAlt } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Backbtn from '../BackBtn';
import { fetchUserDetails } from '../../redux/features/userDetailsSlice';
import Loader from '../Loader';
import { initialUserState, updateUser } from '../../redux/features/UpdateUser';
import verified from '../../assets/verified.png';

function UserProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const userid = localStorage.getItem('userid');
  const dispatch = useDispatch();
  const { loading, data: userSlice, error } = useSelector((state) => state.userSlice);
  const userDetailsData = userSlice?.data;
  const [userForm, setUserForm] = useState(userDetailsData);

  const handleInputChange = (e) => {
    setUserForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleRedirect = () => {
    navigate('/scraprates');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await dispatch(updateUser(userForm));
    if (response.payload.status === 200) {
      toast.success('User Details updated successfully');
      dispatch(fetchUserDetails(userid))?.then((response) => {});
      handleRedirect();
    }
  };
  useEffect(() => {
    dispatch(fetchUserDetails(userid))?.then((response) => {
      if (response.payload) {
        setUserForm(response.payload.data);
      }
    });
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
    <div className='w-full text-center pt-10 bg-gray-100'>
      <div className=' absolute text-start   flex  pt-6 h-10'>
        <Backbtn />
      </div>
      <div className='lg:w-10/12 md:w-10/12 w-full inline-block mt-16'>
        <div className='flex flex-col'>
          <p className='text-3xl  font-bold'>Edit Your Profile</p>
          <div className='bg-white mt-10  w-full lg:p-10 md:p-10 sm:p-5 p-5 rounded-2xl mb-20'>
            <div className='flex justify-between'>
              <h3 className='flex name text-2xl'>
                {' '}
                <span className='flex'>
                  <span className='mr-4 -mt-1 font-medium'>{userDetailsData?.name}</span>
                  <FiEdit3 className='mr-5' />
                </span>
              </h3>
              <NavLink to='/wallet'>
                <button type='submit' className='p-0 m-0 flex py-2 justify-center text-center primaryButton lg:w-40 md:w-40 w-32'>
                  <span className='mr-1'>Your Wallet</span>
                  {' '}
                  <BiWalletAlt className='ml-2 mt-1' />
                </button>
              </NavLink>
            </div>
            <form action='' className='pt-10 text-xl' onSubmit={(FormData) => handleSubmit(FormData)}>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-left'>
                <div>
                  <label htmlFor='Name' className=''>
                    Name
                  </label>
                  <br />
                  <input type='text' className='inputCommonCss w-full mt-2' id='Name' name='name' value={userForm?.name} onChange={handleInputChange} placeholder='Enter your name' />
                </div>

                <div>
                  <div className='flex h-2'>
                  <label htmlFor='email' className=''>
                    Email Id
                  </label>
                  <MdVerified className='mt-1 ml-2 text-green-600' />
                </div>
                  <br />
                  <input type='email' className='inputCommonCss w-full' id='email' name='email' onChange={handleInputChange} value={userForm?.email} placeholder='Enter your email' disabled />
                </div>

                <div>
                  <div className='flex h-2'>
                    <label htmlFor='phone'>Phone</label>
                    <MdVerified className='mt-1 ml-2 text-green-600' />
                  </div>
                  <br />
                  <input type='text' className='inputCommonCss w-full' id='phone_number' name='phone_number' value={userForm?.phone_number} placeholder='Enter your phone number' disabled />
                </div>
                <div>
                  <label htmlFor='email' className=''>
                    UPI-Id
                  </label>
                  <br />
                  <input type='email' className='inputCommonCss w-full mt-2' id='upiId' name='upiId' onChange={handleInputChange} value={userForm?.upiId} placeholder='Enter your UPIID' />
                </div>
              </div>
              <button type='submit' className='primaryButton justify-end mt-10'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
