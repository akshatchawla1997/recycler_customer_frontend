import React, { useRef } from 'react';
import schedulepickup from '../../assets/schedule_a_pick_up.svg';
import addresspickup from '../../assets/pickup_at_address.svg';
import receivePayment from '../../assets/recieve_payment.svg';

function HowWeWork() {
  const whyRef = useRef(null);
  return (
    <div className='w-full flex justify-center mt-6 bg-[#606060] text-white my-3 py-10 md:py-16 lg:py-20' ref={whyRef}>
      <div className='w-11/12 text-center'>
        <h1 className='text-center text-4xl font-bold'>How we work</h1>
        <h3 className='text-center pt-4 pb-4 text-xl'>We will collect your scrap and will help you to know the worth of your scrap</h3>
        <div className='p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
          <div className='rounded-3xl overflow-hidden shadow-lg bg-white p-4 h-80'>
            <div className='rounded-full w-7 text-white bg-green-500 border-green-400 border-3'>
              <p className='text-center text-lg'>1</p>
            </div>
            <img className='mx-auto mt-4' src={schedulepickup} alt='schedule pickup' />
            <div className='px-6 mt-16'>
              <div className='font-bold text-lg mb-2 text-black'>Schedule a pickup</div>
            </div>
          </div>

          <div className='rounded-3xl overflow-hidden shadow-lg bg-white p-4 h-80'>
            <div className='rounded-full w-7 text-white bg-green-500 border-3'>
              <p className='text-center text-xl'>2</p>
            </div>
            <img className='mx-auto' src={addresspickup} alt='pickup address' />
            <div className='px-6 mt-7'>
              <div className='font-bold text-lg mb-2 text-black'>Pickup at your address</div>
            </div>
          </div>

          <div className='rounded-3xl overflow-hidden shadow-lg bg-white p-4 h-80'>
            <div className='rounded-full w-7 text-white bg-green-500 border-green-400 border-3'>
              <p className='text-center text-xl'>3</p>
            </div>
            <img className='mx-auto' src={receivePayment} alt='receive payment' />
            <div className='px-6 py-4'>
              <div className='font-bold text-lg mb-2 text-black'>Receive payment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowWeWork;
