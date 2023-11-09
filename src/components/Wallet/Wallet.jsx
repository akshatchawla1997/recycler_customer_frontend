import React, { useEffect, useState } from 'react';
import { BiWallet } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Backbtn from '../BackBtn';
import TransactionTable from './TransactionTable';
import { getWalletDetails } from '../../redux/api';
import Upi from './Upi';

const redeemHeading = ['Transaction Id', 'Date', 'Time', 'Amount'];
const creditHeading = ['Pickup Id', 'Date', 'Time', 'Amount'];
function Wallet() {
  const [walletAmount, setWalletAmount] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [walletId, setWalletId] = useState(null);
  const walletHistory = useSelector((state) => state.walletHistoryDetails);
  useEffect(() => {
    const userid = localStorage.getItem('userid');

    getWalletDetails().then((response) => {
      const userDetail = response.data;
      const matchingUser = userDetail.find((item) => item.user.toString() === userid);

      if (matchingUser) {
        const walletAmount = matchingUser.wallet_amount;
        setWalletAmount(walletAmount);

        const walletId = matchingUser.id;
        setWalletId(walletId);
      } else {
        console.log('User ID not found in response data.');
      }
    });
  }, []);

  const handlePopupClick = () => {
    setShowPopup(true);
  };

  return (
    <div className='List_container'>
      {showPopup && (
        <div className=''>
          <Upi setShowPopup={setShowPopup} amount={walletAmount} walletId={walletId} />
        </div>
      )}
      <div className='w-full bg-gray-100 pb-10'>
        <div className='flex pt-16'>
          <div className='absolute'>
            <Backbtn />
          </div>
          <div className='flex justify-center w-full'>
            <div className='lg:w-11/12 md:w-11/12 w-full text-center bg-white mt-32 rounded-lg'>
              <div className='flex justify-between lg:p-10 md:p-10 sm:p-5 p-2'>
                <div className='flex'>
                  <button type='submit' className='bg-green-600 text-5xl text-white rounded-full lg:p-8 md:p-8 md:h-28 sm:p-5 p-5'>
                    <BiWallet />
                  </button>
                  <div className='mt-5 lg:ml-8 md:ml-5 ml-3'>
                    <p className='lg:text-2xl md:text-2xl sm:text-xl sm:ml-4 text-start font-medium text-sm text-[#000000bf]'>Wallet Balance</p>
                    <p className='lg:mt-2 lg:text-4xl md:text-3xl text-xl text-start text-[#00000099] sm:text-xl sm:ml-4'>{walletAmount}</p>
                  </div>
                </div>
                <div className='relative'>
                  <h1 className='text-2xl text-md font-medium mb-1'>Transfer to</h1>
                  <div className='flex'>
                    <NavLink to=''  onClick={() => handlePopupClick()}>
                      <button
                        type='submit'
                        className='mr-2 border-green-600 border-2 lg:px-10 md:px-6 sm:px-6 px-3 text-green-600 lg:py-1 md:py-3 sm:py-3 sm:py-2 font-medium rounded-xl text-sm lg:text-xl md:text-xl sm:text-lg'
                      >
                        UPI
                      </button>
                    </NavLink>
                    <NavLink to='/transfertobank'>
                      <button
                        type='submit'
                        className='border-green-600 border-2 lg:px-10 md:px-6 sm:px-6 px-3 text-green-600 lg:py-1 md:py-3 sm:py-3 sm:py-2 font-medium rounded-xl text-sm lg:text-xl md:text-xl sm:text-lg'
                      >
                        Bank
                      </button>
                    </NavLink>
                  </div>
                  <div className='justify-end absolute bottom-1 right-1'>
                    <NavLink to='' className='flex relative text-green-600 font-medium'>
                      <AiOutlinePlus className='absolute top-1 -left-4' />
                      Account  Info
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full mt-10'>
          <TransactionTable name='Redeem Transactions' heading={redeemHeading} walletId={walletId} transactionTypeFilter='dr' />
          <TransactionTable name='Credit Transactions' heading={creditHeading} walletId={walletId} transactionTypeFilter='cr' />
        </div>
      </div>
    </div>
  );
}

export default Wallet;
