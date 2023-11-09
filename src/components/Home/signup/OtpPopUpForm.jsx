/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { regenerateOtp, verifyOtp, walletDetails } from '../../../redux/api';

function OtpPopUpForm(props) {
  const navigate = useNavigate();
  let currentOtpIndex = 0;
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  // const dispatch = useDispatch();

  const [count, setCount] = useState(3);
  const inputRef = useRef(null);

  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const newOtp = [...otp];
    newOtp[currentOtpIndex] = value.substring(value.length - 1);
    if (!value) {
      setActiveOtpIndex(currentOtpIndex - 1);
    } else {
      setActiveOtpIndex(currentOtpIndex);
    }
    setOtp(newOtp);
    setActiveOtpIndex(currentOtpIndex + 1);
  };
  const handleKeyPress = ({ key }, index) => {
    currentOtpIndex = index;
    if (key === 'Backspace' || key === 'ArrowLeft') {
      const previousIndex = index - 1;
      if (previousIndex >= 0) {
        currentOtpIndex = previousIndex;
        setActiveOtpIndex(currentOtpIndex);
      }
    }
  };
  const handleRedirect = async () => {
    if (props.state === 'login') {
      navigate('/scraprates');
    } else {
      try {
        localStorage.setItem('userid', props.id);
        const data = { user: props.id };
        const walletResponse = await walletDetails(data);

        navigate('/user');
      } catch (error) {
        return error;
      }
    }
  };

  const handleSubmit = async (id, newOtp = otp.join('')) => {
    try {
      const response = await verifyOtp(props.id, newOtp);
      localStorage.setItem('userid', props.id);
      if (response?.status === 200) {
        props.setShowPopup(false);
        toast.success('You are Successfully Login');
        localStorage.setItem('AuthToken', response.data.token);
        handleRedirect();
      } else if (response.status === 400) {
        toast.warning('Please Enter a Valid Otp');
      }
    } catch (error) {
      toast.error('Please Enter a Valid Otp');
    }
  };

  const ResendOtp = async (id) => {
    if (count > 0) {
      setCount(count - 1);
      const response = await regenerateOtp({ id });
      toast.success(`${response.data.message}`);
    } else if (count === 0) {
      toast.error('Please try after some time');
    }
  };
  useEffect(() => {
    if (activeOtpIndex === 4) {
      handleSubmit();
    }
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [activeOtpIndex]);

  return (
    <div className='fixed z-50 inset-0 overflow-y-auto bg-gray-300 bg-opacity-50 flex -flex-col justify-center items-center'>
      <div className='bg-white p-10 rounded-xl relative'>
        <MdOutlineCancel className='absolute top-0 right-0 cursor-pointer' size={32} onClick={() => props.setShowPopup(false)} />
        <div className='flex'>
          <h1 className='mx-auto text-xl font-bold justify-center'>Otp Verification</h1>
          <p className='ml-auto mt-1'>
            <span className='px-1'>Attempts Left</span>
            {count}
          </p>
        </div>
        <h3 className='py-3 text-lg'>
          OTP has sent to
          <br />
          {props.mobile}
        </h3>
        <form onSubmit={() => handleSubmit(props.id, otp.join(''))}>
          <div className='flex justify-center pb-10'>
            {otp.map((value, index) => (
              <div key={index}>
                <input
                  ref={index === activeOtpIndex ? inputRef : null}
                  type='number'
                  name='otp1'
                  className='otpText'
                  onChange={handleChange}
                  onKeyDown={({ key }) => handleKeyPress({ key }, index)}
                  value={otp[index]}
                />
              </div>
            ))}
          </div>
        </form>
        <div className='flex justify-between my-3'>
          <p className='text-gray-500 px-1'>The Otp is valid for 15 minutes</p>
          <button type='submit' className='text-blue-500 hover:text-blue-700 font-semibold ' onClick={() => ResendOtp(props.id)}>
            Resend Otp
          </button>
        </div>
      </div>
    </div>
  );
}
export default OtpPopUpForm;
