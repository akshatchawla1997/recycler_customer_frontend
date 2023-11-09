import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCaretDown } from 'react-icons/ai';
import ConfirmPick from '../../assets/confirm_pickup.png';
import { fetchUserDetails } from '../../redux/features/userDetailsSlice';
import { fetchScrap } from '../../redux/features/scraprateSlice';
import OrderDetailsTable from './OrderDetailsTable';
import Loader from '../Loader';
import Error from '../Error';

export function ConfirmPickup() {
  const [itemList, setitemList] = useState(false);
  const [UserDetails, setUserDetails] = useState({});
  const dispatch = useDispatch();
  const pickupReturnData = useLocation();
  const userid = localStorage.getItem('userid');
  const pickupSuccess = pickupReturnData?.state?.pickupData;
  const pickupSuccessItemId = pickupSuccess.data.items;
  useEffect(() => {
    dispatch(fetchUserDetails(userid))?.then((response) => {
      setUserDetails(response?.payload?.data);
    });
  }, []);
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    dispatch(fetchScrap())?.then((response) => {});
  }, []);
  const { loading, data: scrapData, error } = useSelector((state) => state.scrapDetails);
  if (loading) {
    <Loader />;
  } else if (error) {
    <Error />;
  }
  const scrapDetails = scrapData?.data.data;
  const filteredData = scrapDetails?.filter((item) => pickupSuccessItemId?.includes(item.id));
  return (
    <div className='bg-white pt-16'>
      {/* upper block */}
      <div className='w-full flex   md:flex-row lg:px-28 md:px-20 px-20 py-8 md:items-start md:justify-between bg-[#DCFFF1] pt-28'>
        <div className='flex flex-col'>
          <div className='px-2'>
            <h1 className='font-semibold text-left  text-3xl'>Yehh ! Pickup is Requested</h1>
            <p className=' py-5 text-left text-xl'>Thankyou, for Choosing Kabadijee </p>
          </div>
          <div className='text-left px-2 pb-10'>

            <NavLink to='/'>
              <button type='submit' className='border-2 border-green-600 px-2 py-2 rounded-lg text-green-600'>
                Go to Home page
              </button>
            </NavLink>
          </div>
        </div>
        <div className='flex justify-center  '>
          <div className='flex '>
            <img src={ConfirmPick} alt='' className='w-52 h-52 md:w-60 lg:w-80 lg:h-80' />
          </div>
        </div>
      </div>
      {/* lower block */}
      <div className='flex flex-col-reverse'>
        <div className='w-full flex flex-col my-10 justify-center'>
          <div className='rounded-lg mx-4 md:mx-20 lg:mx-40 xl:mx-52 2xl:mx-80 bg-[#F3F3F3] py-1'>
            <p className='text-2xl mx-10 my-6 cursor-pointer block text-start' onClick={() => setitemList(!itemList)}>
              <AiFillCaretDown className={`${itemList === false ? '-rotate-90' : ''} absolute`} />
              <span className='font-bold text-2xl ml-8'>Order Items</span>
            </p>
            <hr className='mb-10 mx-6' />
          </div>

          {itemList
            && filteredData?.map((item, index) => (
              <div className=' flex mx-4 md:mx-20 lg:mx-40 xl:mx-52 2xl:mx-80 border-b  bg-[#F3F3F3] px-2 py-2 rounded-md'>
                <hr className='mb-10 mx-6' />
                <div className='rounded-sm bg-white px-1 py-1' key={index}>
                  <img src={item.image_url} className='w-32 h-20 ' alt='' />
                </div>
                <div className='w-full flex px-1 py-4 '>
                  <div className='w-full flex flex-wrap justify-between items-center'>
                    <h4 className='px-5 font-bold text-black'>{item?.item_name}</h4>
                    <p className='px-5'>
                      {' '}
                      {item.rate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/*  */}
        <div className='w-full  flex justify-center'>
          <OrderDetailsTable pickupSuccessData={pickupSuccess.data} UserDetails={UserDetails} />
        </div>
      </div>
    </div>
  );
}
