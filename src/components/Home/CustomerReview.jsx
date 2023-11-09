import React from 'react';
import Corousel from './Corousel/Corousel';

function CustomerReview() {
  return (
    <div className='min-w-full text-center mt-32' id='customerReviews'>
      <h1 className='text-4xl'>What Customers Say About Us</h1>
      <div className='w-full corousel'>
        <Corousel />
      </div>
    </div>
  );
}

export default CustomerReview;
