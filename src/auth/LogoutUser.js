import { useAuth } from './auth';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { logout } from '../apis/authAPI';
import authManager from '../services/authManager';

const Logout = () => {
  const { setLoggedInUser, setLoadedLocal } = useAuth();
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  useEffect(() => {
    setLogoutSuccess(true);
    localStorage.removeItem('users');
    setLoadedLocal(false);
    setLoggedInUser();
    authManager.logout();
  }, []);

  if (logoutSuccess) {
    return <Redirect push to='/' />;
  }
  return null;
};

export default Logout;
