import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

function HamburgerMenu({ onClick }) {
  return (
    <button type='submit' className='inline-flex  items-center justify-center p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600' onClick={onClick}>
      <span className='sr-only'>Open main menu</span>
      <GiHamburgerMenu className='p-10 w-6 h-6' />
    </button>
  );
}

export default HamburgerMenu;
