/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import household from '../../assets/household.svg';
import HouseholdElement from '../../assets/household_element.svg';

function ServiceForHouseHold() {
  return (
    <div className='pt-28' id='household'>
      <h1 className='px-1 lg:text-4xl md:text-4xl sm:text-3xl text-2xl font-bold text-[#444] text-center mb-10'>Our Services for Household & Corporates</h1>
      <div className='w-full text-center bg-[#606060]'>
        <div className='w-11/12 inline-block'>
          <div className='flex flex-col md:flex-row items-center font-sans py-10'>
            <div className='w-full'>
              <img src={household} alt='your-image-description' className='' />
            </div>
            <div className='w-full'>
              <div className='w-full text-center'>
                <div className='lg:w-11/12 md:w-10/12 sm:w-7/12 inline-block'>
                  <img src={HouseholdElement} alt='household element' className='absolute right-0' />
                  <h2 className='sm:mt-28 mt-28 lg:mt-4 text-center text-4xl lg:w-11/12 mb-5  text-white font-medium'>HouseHolds</h2>
                  <p className='text-center lg:w-11/12 mb-5  text-white'>
                    Any item that is left over or wasted after doing routine domestic tasks is referred to as household scrap. This can include outdated clothing, damaged furniture, discarded
                    electronics, and other non-essential household items. It's crucial to properly dispose of household scrap in order to protect the environment and maintain public safety and health.
                    We " Kabadi Jee ” will help you in minimizing your household scrap.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceForHouseHold;
