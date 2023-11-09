import React from 'react';
import CooprateElement from '../../assets/cooprate_element.svg';
import cooperate from '../../assets/cooprate.svg';

function Cooperate() {
  return (
    <div className='w-full text-center bg-[#DCFFF166]'>
      <div className='w-11/12 inline-block mt-10'>
        <img src={CooprateElement} alt='your-image-description' className='absolute' />
        <div className='flex flex-col md:flex-row items-center font-sans mt-32 lg:mt-10 md:mt-10 sm:mt-10'>
          <div className='w-full'>
            <div className='w-full text-center'>
              <div className='lg:w-7/12 md:w-7/12 sm:w-7/12 inline-block'>
                <h1 className='w-full text-center md:text-start text-4xl font-semibold'>Corporates</h1>
                <p className='py-5 text-xl text-start'>Why step out to get rid of your scrap, when you can book scrap pickup service from the comfort and convenience of your home</p>
              </div>
            </div>
          </div>
          <div className='w-full md:w-10/12 lg:w-10/12'>
            <img src={cooperate} alt='' className='float-right' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cooperate;
