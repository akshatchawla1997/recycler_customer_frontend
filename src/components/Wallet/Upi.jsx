import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchUserDetails } from '../../redux/features/userDetailsSlice';
import { walletHistoryData } from '../../redux/features/walletHistorySlice';

function Upi(props) {
  const userid = localStorage.getItem('userid');
  const dispatch = useDispatch();
  const [upiId, setUpiId] = useState('');
  const [inputAmount, setInputAmount] = useState('');

  useEffect(() => {
    dispatch(fetchUserDetails(userid));
  }, [dispatch]);

  const userDetails = useSelector((state) => state.userSlice.data);

  useEffect(() => {
    if (userDetails && userDetails.data.upiId) {
      setUpiId(userDetails.data.upiId);
    }
  }, [userDetails]);

  const handleClick = async () => {
    if (!inputAmount || parseFloat(inputAmount) <= 0) {
      toast.error('Invalid transaction amount.');
      return;
    }

    const transactionAmount = parseFloat(inputAmount);
    const walletAmount = parseFloat(props.amount);

    if (transactionAmount > walletAmount) {
      toast.error('Transaction amount exceeds wallet balance.');
      return;
    }
    const transactionData = {
      transaction_type: 'dr',
      transaction_amount: inputAmount,
      description: 'redeemed',
      wallet: props.walletId,
    };
    try {
      await dispatch(walletHistoryData(transactionData));
      toast.success('Transaction completed.');
      props.setShowPopup(false);
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  return (
    <div>
      <div className='fixed z-50 inset-0 flex bg-opacity-50 bg-gray-300 justify-center items-center'>
        <div className='bg-white relative p-10 lg:w-1/3 md:w-1/3 w-full rounded-2xl m-48'>
          <MdOutlineCancel className='absolute top-0 right-0 cursor-pointer' style={{ color: 'black' }} size={32} onClick={() => props.setShowPopup(false)} />
          <div>
            <h1 className='text-2xl text-center font-bold mb-10 text-black'>Payment</h1>
            <label htmlFor='email address' className='text-black font-semibold'>
              UPI Id
            </label>
            <br />
            <input type='email' name='upiId' className='inputCommonCss w-10/12 bg-white text-black text-center mt-4' placeholder='Enter UPI Id' value={upiId} required readOnly />
          </div>
          <div className='mt-10'>
            <label htmlFor='email address' className='text-black font-semibold'>
              Amount
            </label>
            <br />
            <input type='email' name='upi' className='inputCommonCss w-10/12 bg-white text-black text-center mt-4' value={inputAmount} onChange={(e) => setInputAmount(e.target.value)} required />
            {inputAmount !== '' && inputAmount <= 0 && <p style={{ color: 'red' }}>Enter a valid transaction amount.</p>}
            {inputAmount !== '' && parseFloat(inputAmount) > parseFloat(props.amount) && <p style={{ color: 'red' }}>Insufficient balance.</p>}
            <div className='flex justify-center mt-10'>
              <button type='submit' className='rounded-xl px-10 py-2 bg-[#27AE76] text-white' onClick={() => handleClick()}>
                Redeem
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upi;
