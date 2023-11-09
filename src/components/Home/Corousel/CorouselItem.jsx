import React from 'react';

function CarouselItem({ customerReviews }) {
  return (
    <div className='max-w-fit grid grid-cols-1 place-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-6 gap-4'>
      {customerReviews.map((review, index) => (
        <div key={index} className=''>
          <div className='border-2 py-10 w-80 px-10 shadow-lg text-left rounded-2xl p-4 h-full'>
            <div className='flex items-center mb-4'>
              <img src={review.src} alt='profile' className='w-12 h-12 rounded-full mr-4' />
              <div className='namedetail'>
                <h3 className='text-xl font-bold'>{review.name}</h3>
                <p className='text-xl'>{review.userType}</p>
              </div>
            </div>
            <div className='comment'>
              <p className='text-sm italic'>
                &quot;
                {review.text}
                &quot;
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CarouselItem;
