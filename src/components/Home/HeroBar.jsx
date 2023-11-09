import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import sideImage from '../../assets/illutratin.svg';
import SignupForm from './signup/SignupForm';
import SignInForm from './login/SignInForm';

function HeroBar(props) {
  const location = useLocation();
  const [loginForm, setLoginForm] = useState(true);
  const handleNewUser = () => {
    setLoginForm(!loginForm);
  };
  return (
    <div className='w-full mb-32' id='herobar'>
      <div className='w-full flex flex-col lg:flex-row md:flex-row lg:mb-32'>
        <div className='flex flex-col w-full lg:w-6/12 md:w-1/2  md:pt-24 lg:pt-40 lg:ml-20 md:ml-10 '>
          <h1 className='text-3xl ml-6 mt-20  lg:ml-2 md:mt-16 sm:mt-16  md:text-4xl md:text-left font-medium text-start'>
            Small Actions, Big Impact:
            <br />
          </h1>
          <span className='text-green-500 ml-6 lg:ml-2 pt-4 text-left text-4xl md:text-5xl font-medium'>Recycle with Us</span>
          <div className='mt-8 flex justify-center w-full p-4 lg:p-0 md:p-0 lg:w-9/12 md:w-11/12 sm:w-full lg:justify-start lg:m-0 lg:mt-6 md:ml-4'>
            {localStorage.getItem('AuthToken') == null ? (
              <div className='signup border-2 p-10 shadow-xl rounded-lg w-full lg:mt-10' id='signup'>
                {loginForm ? <SignInForm handleNewUser={handleNewUser} /> : <SignupForm handleNewUser={handleNewUser} />}
              </div>
            ) : (
              <div className='text-start ml-2 '>
                <p className='text-lg'>We will collect your scrap and will help you to know the worth of your scrap</p>
                <NavLink to='/scraprates'>
                  <button type='submit' className='primaryButton mt-10'>
                    Sell Scrap
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
        <div className='w-full md:w-1/2 md:mt-28 lg:w-7/12 lg:inline lg:mt-36'>
          <img src={sideImage} alt='' className='pt-12' />
        </div>
      </div>
    </div>
  );
}

export default HeroBar;
