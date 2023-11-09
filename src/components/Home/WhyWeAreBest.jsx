import React from 'react';
import { NavLink } from 'react-router-dom';
import element from '../../assets/element.svg';
import check from '../../assets/check.png';
import WeAreTheBest from '../../assets/we_are_the_best.svg';

const checkboxes = [
  { label: 'Job Creation' },
  { label: 'Environmental Sustainability' },
  { label: 'Economic Benefits' },
  { label: 'Waste Reduction' },
  { label: 'Resource Conservation' },
  { label: 'Community Engagement' },
];

function WhyWeAreBest() {
  const handleNavlink = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className='w-full text-center pt-20' id='whyUs'>
      <div className='w-11/12 inline-block'>
        <div className='flex flex-col md:flex-row items-center font-sans py-10'>
          <div className='w-full'>
            <img src={WeAreTheBest} alt='your-description' className='' />
          </div>
          <div className='w-full md:w-10/12 lg:w-10/12'>
            <img src={element} alt='' className='float-right' />
            <h1 className='w-full text-center md:text-start text-4xl font-semibold '>Why we are the best</h1>
            <p className='py-5 text-xl md:w-full text-start'>
              Kabadi Jee removes junk from your home without any difficulty. We add a technological example to get rid of scrap in exchange for valuable money. The Kabadi Jee offers its customers an
              environmental report detailing their ecological impact in numbers once the discarded materials are dropped off at the appropriate recycling facilities.
            </p>
            <div className='checkboxes w-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
              {checkboxes.map((checkbox, index) => (
                <div key={index} className='w-auto flex items-center gap-2'>
                  <img src={check} className='py-4' alt='' />
                  <span className='text-xl text-left'>{checkbox.label}</span>
                </div>
              ))}
            </div>
            <div className='pt-8 flex'>
              <NavLink to='/scraprates'>
                <button type='submit' onClick={handleNavlink} className='text-[#27AE76] font-medium border-2 border-green-500 w-60 lg:w-96 md:w-80 py-2 rounded-xl'>
                  Get Started
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyWeAreBest;
