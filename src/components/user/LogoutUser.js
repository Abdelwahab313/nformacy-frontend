import { useAuth } from '../../context/auth';
import React, { useEffect, useState } from 'react';
import { logout } from '../../apis/authAPI';
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
        setLoadedLocal(false);
      })
      .then(() => {
        setLogoutSuccess(true);
      });
  }, []);

  if (logoutSuccess) {
    return <Redirect push to='/' />;
  }
  return null;
};

export default Logout;
