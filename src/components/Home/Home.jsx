import React, { useState } from 'react';
import HowWeWork from './HowWeWork';
import WhyWeAreBest from './WhyWeAreBest';
import ServiceForHouseHold from './ServiceForHouseHold';
import Cooperate from './Cooperate';
import HeroBar from './HeroBar';
import OurStory from './OurStory';

// import CustomerReview from './CustomerReview';

function Home() {
  const [loginForm, setLoginForm] = useState(false);
  return (
    <div className='w-full grid-cols-1 md:grid-cols-2 '>
      <HeroBar loginForm={loginForm} setLoginForm={setLoginForm} />
      <div className='w-full'>
        <HowWeWork />
        <WhyWeAreBest />
        <ServiceForHouseHold />
        <Cooperate />
        {/* <CustomerReview /> */}
        <OurStory />
      </div>
    </div>
  );
}

export default Home;
