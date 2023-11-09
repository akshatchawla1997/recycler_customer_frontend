import React, { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

function OrderDetailsTable({ pickupSuccessData, UserDetails }) {
  const [detailList, setDetailList] = useState(true);
  return (
    <>
      <div className='w-full  mx-4 md:mx-20 lg:mx-40 xl:mx-52 2xl:mx-80 shadow-md mt-6 bg-[#F3F3F3] px-6 py-4 rounded-lg'>
        <div>
          <p className='text-2xl md:px-4 py-4 md:pb-4 text-left font-bold cursor-pointer' onClick={() => setDetailList(!detailList)}>
            <AiFillCaretDown className={`${detailList === false ? '-rotate-90' : ''} absolute`} />
            <span className='ml-8 text-2xl'>Order Details</span>
          </p>
        </div>
        <hr className=' mb-6 bg-[#E8E8E8]' />

        {detailList && (
          <div className='md:px-20 md:pb-10 '>
            <div className='flex justify-between py-2'>
              <div>
                <p className=' text-[#474747] text-xl font-medium'>Order Id</p>
              </div>
              <div>
                <p className='text-[#8A8A8A] text-xl'>{pickupSuccessData?.id}</p>
              </div>
            </div>

            <div className='flex justify-between py-2'>
              <div>
                <p className='text-[#474747] text-xl font-medium'>Name</p>
              </div>
              <div>
                <p className='text-[#8A8A8A] text-xl'>{UserDetails.name}</p>
              </div>
            </div>

            <div className='flex  justify-between items-center py-2'>
              <div className=''>
                <p className='text-left text-xl text-[#474747] font-medium'>Pickup Address</p>
              </div>
              <div className='flex flex-wrap '>
                <p className='text-right text-[#8A8A8A] text-xl'>
                  {pickupSuccessData?.flat_number}
                  ,
                  {pickupSuccessData?.area}
                  <br />
                  {pickupSuccessData?.landmark}
                  {' '}
                </p>
              </div>
            </div>
            <div className='flex justify-between items-center py-2'>
              <div className='text-[#474747]'>
                <p className='text-[#474747] text-xl font-medium'>City</p>
              </div>
              <div className=''>
                <p className='text-[#8A8A8A] text-xl'>{pickupSuccessData?.city}</p>
              </div>
            </div>
            <div className='flex justify-between items-center py-2'>
              <div className=''>
                <p className='text-[#474747] text-xl font-medium'>State</p>
              </div>
              <div className=''>
                <p className='text-[#8A8A8A] text-xl'>{pickupSuccessData?.state}</p>
              </div>
            </div>
            <div className='flex justify-between py-2'>
              <div>
                <p className='text-[#474747] text-xl font-medium'>Pincode</p>
              </div>
              <div>
                <p className='text-[#8A8A8A] text-xl'>{pickupSuccessData?.pincode}</p>
              </div>
            </div>
            <div className='flex justify-between py-2'>
              <div>
                <p className='text-[#474747] text-xl font-medium'>Pickup date</p>
              </div>
              <div>
                <p className='text-[#8A8A8A] text-xl'>{pickupSuccessData?.pickup_date}</p>
              </div>
            </div>

            <div className='flex justify-between py-2'>
              <div>
                <p className='text-[#474747] text-xl font-medium'>Time</p>
              </div>
              <div>
                <p className='text-[#8A8A8A] text-xl'>{pickupSuccessData?.pickup_time}</p>
              </div>
            </div>
            <div className='flex justify-between py-2'>
              <div>
                <p className='text-[#474747] text-xl font-medium'>Pickup OTP</p>
              </div>
              <div>
                <p className='text-[#8A8A8A] text-xl'>{UserDetails?.pickup_otp}</p>
              </div>
            </div>
          </div>
        )}
        {/*  */}
      </div>

      {/* <h5 className='text-xl text-start mt-5 font-semibold'>Provide this OTP to the vendor for confirm Pickup</h5> */}
    </>
  );
}

export default OrderDetailsTable;
