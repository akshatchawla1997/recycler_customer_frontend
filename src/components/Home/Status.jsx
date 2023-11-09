import React, { useState } from 'react';
import SignInForm from './login/SignInForm';
import SignUpForm from './signup/SignupForm';

function ToggleButton({ active, onClick }) {
  return (
    <button type='submit' className={`px-14 py-2 rounded-sm ${active ? ' text-green-500 border-b-2 border-green-500' : 'text-gray-500'}`} onClick={onClick}>
      {active ? 'Already a user' : 'New User'}
    </button>
  );
}

function Status() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleSignIn = () => {
    setIsSignUp(false);
    setIsLogin(true);
  };

  const handleSignUp = () => {
    setIsSignUp(true);
    setIsLogin(false);
  };

  return (
    <div className='flex flex-col items-start'>
      <div className='flex justify-center space-x-2'>
        <ToggleButton active={isLogin} onClick={handleSignIn} />
        <ToggleButton active={isSignUp} onClick={handleSignUp} />
      </div>
      {isSignUp ? <SignUpForm /> : <SignInForm />}
    </div>
  );
}

export default Status;
