import React from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';
import 'react-alice-carousel/lib/scss/alice-carousel.scss';
import AliceCarousel from 'react-alice-carousel';
import CorouselItem from './CorouselItem';
import profile from '../../../assets/profile.png';

const customerReviews = [
  {
    src: profile,
    name: 'Poornima barola',
    userType: 'Visit user',
    text: 'Very useful app. Doctor responded so many times without charging any fee. She patiently answerd Thank so much Dr Renu. Wonderful app',
  },
  {
    src: profile,
    name: 'Priya Chaudhary',
    userType: 'Visit user',
    text: 'Very useful app. Doctor responded so many times without charging any fee. She patiently answerd Thank so much Dr Renu. Wonderful app',
  },
  {
    src: profile,
    name: 'Shrey Kumar',
    userType: 'Visit user',
    text: 'Very useful app. Doctor responded so many times without charging any fee. She patiently answerd Thank so much Dr Renu. Wonderful app',
  },
];
function Corousel() {
  return (
    <div className='min-w-fit flex justify-center mb-20'>
      <CorouselItem customerReviews={customerReviews} />
    </div>
  );
}

export default Corousel;
