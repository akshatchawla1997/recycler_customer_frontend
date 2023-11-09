import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import OtpPopUpForm from '../signup/OtpPopUpForm';
import { loginUser } from '../../../redux/features/authSlice';

const initialLoginState = {
  email: '',
};
function SignInForm({ handleNewUser }) {
  const [signInData, setSignInData] = useState(initialLoginState);
  const [showPopup, setShowPopup] = useState(false);
  const [id, setId] = useState('');

  // eslint-disable-next-line camelcase
  const { email } = signInData;
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignInData({ ...FormData, [name]: value });
  };
  // eslint-disable-next-line no-shadow
  const handleSubmit = async (event, signInData) => {
    event.preventDefault();
    try {
      // eslint-disable-next-line camelcase
      if (email) {
        const { payload: response } = await dispatch(loginUser({ signInData }));
        if (response?.data?.status !== 200) {
          toast.error(`${response.data.email}`);
        } else {
          toast.success('OTP Sent Successfully');
          setId(response?.data?.data?.id);
          setShowPopup(true);
        }
      }
    } catch (e) {
      toast.warn('Check Credientials email is not registered');
    }
  };
  const isFormValid = signInData.email;
  return (
    <div className='relative w-full'>
      {showPopup && (
        <div className=''>
          <OtpPopUpForm mobile={signInData.email} id={id} setShowPopup={setShowPopup} state='login' />
        </div>
      )}
      <h3 className='text-3xl font-bold text-center text-green-500'>Login</h3>
      <div className='pt-10 relative w-full' id='login'>
        <form onSubmit={(e) => handleSubmit(e, signInData)}>
          <div className='py-2 '>
            <input type='email' className='inputCommonCss px-2 w-full' name='email' value={signInData.email} onChange={handleInputChange} placeholder='Enter your email' />
          </div>
          <div className='py-5 justify-end flex'>
            <button className={isFormValid ? 'primaryButton w-full' : 'disabledButton w-full'} type='submit' disabled={!isFormValid}>
              Get OTP
            </button>
          </div>
        </form>
        <div className='flex justify-end'>
          <button type='submit' onClick={() => handleNewUser(false)} className='text-blue-600 py-5 font-semibold'>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
