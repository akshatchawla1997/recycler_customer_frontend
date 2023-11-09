import React, { useState, useEffect } from 'react';
import { NavHashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { BsBox2Fill, BsQuestionCircleFill } from 'react-icons/bs';
import { MdMedicalServices } from 'react-icons/md';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { ImHome } from 'react-icons/im';
import { FaRupeeSign } from 'react-icons/fa';
import { IoBook } from 'react-icons/io5';
import navigationItems from './NavigationItems.json';

function HamburgerItems({ setHamburgerToggle, setOpenList }) {
  const [authToken, setAuthToken] = useState('');
  const routeMappings = {
    profile: '/user',
    order: '/myorders',
    home: '/',
  };
  useEffect(() => {
    setAuthToken(localStorage.getItem('AuthToken'));
  });
  const navigate = useNavigate();
  const handleLogout = () => {
    if (localStorage.getItem('AuthToken')) {
      localStorage.removeItem('AuthToken');
      localStorage.removeItem('profile');
      localStorage.removeItem('username');
      localStorage.removeItem('userid');
      setAuthToken('');
      setHamburgerToggle(false);
      navigate('/');
      setOpenList(false);
    }
  };
  function handleTabClick() {
    setHamburgerToggle(false);
  }
  const handleNavigate = (values) => {
    setHamburgerToggle(false);
    const targetRoute = routeMappings[values];
    if (targetRoute) {
      navigate(targetRoute);
    }
  };
  return (
    <div>
      {authToken && (
        <div onClick={() => handleNavigate('profile')} className='flex cursor-pointer hover:bg-green-50 py-2 w-full p-4  border-solid border-black text-center text-xl'>
          <div className='pr-4 px-2'>
            <BiUser />
          </div>
          <div className='px-2 w-32  flex'>
            <p>My Profile</p>
          </div>
        </div>
      )}
      {authToken && (
        <div onClick={() => handleNavigate('order')} className='flex cursor-pointer hover:bg-green-50  w-full p-4  border-solid border-black text-center text-xl'>
          <div className='pr-4 px-2'>
            <BsBox2Fill />
          </div>
          <div className='px-2 w-32  flex'>
            {' '}
            <p>My Order</p>
          </div>
        </div>
      )}
      {!authToken ? (
        <div onClick={() => handleNavigate('home')} className='flex hover:bg-green-50  w-full p-4   border-solid border-black text-center text-xl'>
          <div className='pr-4 px-2'>
            <BiUser />
          </div>
          <div className='px-2 w-32  flex'>
            <p>Login</p>
          </div>
        </div>
      ) : (
        ''
      )}
      {navigationItems.map((item, index) => (
        <NavHashLink key={index} to={item.path} onClick={handleTabClick} smooth>
          <div key={index} onClick={() => handleTabClick} className='flex hover:bg-green-50   p-4 border-solid border-black text-center text-xl '>
            {item.label === 'Why Us' ? (
              <div className='pr-4 px-2'>
                <BsQuestionCircleFill />
              </div>
            ) : item.label === 'Services' ? (
              <div className='pr-4 px-2'>
                <MdMedicalServices />
              </div>
            ) : item.label === 'Home' ? (
              <div className='pr-4 px-2'>
                <ImHome />
              </div>
            ) : item.label === 'Scrap Rates' ? (
              <div className='pr-4 px-2'>
                <FaRupeeSign />
              </div>
            ) : item.label === 'Our Story' ? (
              <div className='pr-4 px-2'>
                <IoBook />
              </div>
            ) : (
              ''
            )}
            <div className='px-2 w-32 flex'>
              <li className='list-none'>{item.label}</li>
              {' '}
            </div>
          </div>
        </NavHashLink>
      ))}
      {authToken && (
        <div onClick={handleLogout} className='flex cursor-pointer hover:bg-green-50  w-full p-4 border-solid border-black text-center text-xl'>
          <div className='pr-4 px-2'>
            <RiLogoutBoxFill />
          </div>
          <div className='px-2 w-32  flex'>
            <p>Logout</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default HamburgerItems;
