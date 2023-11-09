/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../../../redux/features/authSlice';
import OtpPopUpForm from './OtpPopUpForm';

function SignupForm({ handleNewUser }) {
  const [FormData, setFormData] = useState({
    email: '',
    phone_number: '',
  });
  const { email, phone_number } = FormData;
  const [showPopup, setShowPopup] = useState(false);

  const [id, setId] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...FormData, [name]: value });
  };

  const handleSubmit = async (event, FormData) => {
    event.preventDefault();
    try {
      if (email && phone_number) {
        const { payload: response } = await dispatch(register({ FormData }));
        if (response.status === 201) {
          toast.success('OTP Sent Successfully');
          setId(response?.data?.id);
          setShowPopup(true);
        } else {
          if (response.data.phone_number) {
            toast.error(`${response.data.phone_number}`);
          }
          if (response.data.email) {
            toast.error(`${response.data.email}`);
          }
        }
      }
    } catch (e) {
      toast.error('Check Credientials');
    }
  };
  const isFormValid = email && phone_number.length === 10;
  return (
    <div>
      {showPopup && (
        <div className=''>
          <OtpPopUpForm mobile={FormData.email} id={id} setShowPopup={setShowPopup} state='signup' />
        </div>
      )}
      <div className='relative h-64'>
        <h1 className='text-3xl font-bold text-green-500'>Register User</h1>
        <form className='pt-3' onSubmit={(e) => handleSubmit(e, FormData)}>
          <div className=' pt-4'>
            <input className='inputCommonCss w-full' type='email' name='email' value={FormData.email} onChange={handleInputChange} placeholder='Enter your Email Id' />
          </div>
          <div className='py-4'>
            <input className='inputCommonCss w-full' type='Number' name='phone_number' value={FormData.phone_number} onChange={handleInputChange} placeholder='Mobile Number' />
          </div>

          <div className='py-4 flex justify-end'>
            <button className={isFormValid ? 'primaryButton w-full' : 'disabledButton w-full'} type='submit' disabled={!isFormValid}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className='flex justify-end'>
        <button type='submit' className='text-blue-600 font-medium' onClick={() => handleNewUser(true)}>
          Already a User
        </button>
      </div>
    </div>
  );
}
export default SignupForm;
