import React from 'react';
import { NavLink } from 'react-router-dom';

function HamburgerMenuItems({ isOpen, onClose }) {
  return (
    <div className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute top-16 w-full bg-white shadow-lg py-2`}>
      <NavLink to='/' className='block px-4 py-2 text-gray-800 hover:bg-gray-100' activeClassName='bg-gray-100' onClick={onClose}>
        Home
      </NavLink>
      <NavLink to='/about' className='block px-4 py-2 text-gray-800 hover:bg-gray-100' activeClassName='bg-gray-100' onClick={onClose}>
        About
      </NavLink>
      <NavLink to='/contact' className='block px-4 py-2 text-gray-800 hover:bg-gray-100' activeClassName='bg-gray-100' onClick={onClose}>
        Contact
      </NavLink>
    </div>
  );
}

export default HamburgerMenuItems;
