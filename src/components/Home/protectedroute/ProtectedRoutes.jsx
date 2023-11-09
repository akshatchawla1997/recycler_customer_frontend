import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';

function ProtectedRoutes({ children }) {
  const auth = useAuth;
  const AuthToken = localStorage.getItem('AuthToken');

  if (AuthToken === null) {
    <Navigate to='/' />;
  }
  // return auth ? <Outlet /> : <Navigate to='/' />;
  return children;
}

export default ProtectedRoutes;
