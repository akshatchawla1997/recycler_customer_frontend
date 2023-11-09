import React from 'react';
import { NavHashLink } from 'react-router-hash-link';
import footerimg from '../../assets/footer illlustration.svg';
import recyclerLogo from '../../assets/KabadiJeeDarkTheme.png';
import SocialHandle from './SocialHandle';
import Links from './Links';
import ContactUs from './ContactUs';

function SiteFooter() {
  return (
    <div className='bg-[#606060] w-full'>
      <div className='p-2 ml-2 grid grid-cols-2 text-start sm:grid-cols-2 lg:grid-cols-3 '>
        <div className='w-[130px] mt-5 m-auto mb-10 sm:w-auto sm:mb-5 md:mb-9 md:ml-9 lg:ml-5 flex flex-col justify-center'>
          <NavHashLink to='/#herobar'>
            <img src={recyclerLogo} alt='companyLogo' className='m-auto text-white w-52  mb-5 sm:mb-0 sm:ml-[20px] xl:ml-' />
          </NavHashLink>

          <address className='py-5 text-white text-sm md:text-lg'>
            Noida Sector-62, Pin-201301
            <br />
          </address>
          <img src={footerimg} alt='footerimg' className='h-32 sm:h-48' />
        </div>
        <div className='w-[130px] mt-5 mx-auto mb-10 sm:w-auto sm:mb-0 flex justify-center align-middle'>
          <div className='links'>
            <Links />
          </div>
        </div>
        <div className='flex justify-center mb-10 sm:mb-0 mt-5'>
          <ContactUs />
        </div>
      </div>
      <hr />
      <div className='flex flex-row items-center sm:flex-row sm:justify-between'>
        <p className='text-white p-2 py-2 text-sm md:text-s'>
          <span className='text-xl'>&copy;</span>
          {' '}
          2023, All Rights are Reserved
          <span className='hidden md:inline'>with Pando Indian Software Consultant</span>
        </p>
        <div className='p-2 w-auto'>
          <SocialHandle />
        </div>
      </div>
    </div>
  );
}

export default SiteFooter;
