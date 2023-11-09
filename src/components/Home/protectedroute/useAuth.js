import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const authToken = localStorage.getItem('AuthToken');
      if (authToken) {
        setAuth(true);
      } else {
        setAuth(false);
        // Redirect the user to the login page
        navigate('/');
      }
    };

    checkAuthentication();
  }, [navigate]);

  return { auth };
}
