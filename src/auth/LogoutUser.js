import { useAuth } from './auth';
import React, { useEffect, useState } from 'react';
import { logout } from '../apis/authAPI';
import { Redirect } from 'react-router';

const Logout = (props) => {
  const {
    authTokens,
    setAuthTokens,
    setLoggedInUser,
    setLoadedLocal,
  } = useAuth();
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  useEffect(() => {
    logout(authTokens)
      .then((result) => {
        setAuthTokens();
      })
      .then(() => {
        localStorage.removeItem('tokens');
      })
      .then(() => {
        localStorage.removeItem('users');
      })
      .then(() => {
        setAuthTokens();
      })
      .then(() => {
        setLoggedInUser();
      })
      .then(() => {
        setLogoutSuccess(true);
      })
      .catch(() => {
        localStorage.removeItem('tokens');
        localStorage.removeItem('users');
        setAuthTokens();
        setLoggedInUser();
        setLoadedLocal(false);
        setLogoutSuccess(true);
      });
  }, []);

  if (logoutSuccess) {
    return <Redirect push to='/' />;
  }
  return null;
};

export default Logout;
