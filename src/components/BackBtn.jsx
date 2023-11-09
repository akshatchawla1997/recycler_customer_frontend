import React from 'react';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export default function Backbtn() {
  const history = useNavigate();
  return (
    <div>
      <button type='submit' onClick={() => history(-1)} className=''>
        <RiArrowGoBackFill className='my-10 mx-2 h-10 w-9' />
        {' '}
      </button>
    </div>
  );
}
