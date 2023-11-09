import React from 'react';
import ErrorPage from '../assets/ErrorPage.png';

function Error() {
  return (
    <div className='bg-white text-center w-screen h-screen flex flex-col items-center justify-center'>
      <h1 className='text-3xl'>Oops, Something wrong here</h1>
      <p className='text-lg pt-2'>404 error, page not found</p>
      <img src={ErrorPage} alt='Error page' className='mt-2' />
    </div>
  );
}

export default Error;
