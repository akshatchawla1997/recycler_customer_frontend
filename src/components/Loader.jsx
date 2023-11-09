import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

function Loader() {
  return (
    <div className='fixed z-50 inset-0 overflow-y-auto bg-gray-300 bg-opacity-50 flex -flex-col justify-center items-center'>
      <RotatingLines Color='grey' strokeWidth='3' animationDuration='0.75' width='96' visible />
    </div>
  );
}

export default Loader;
