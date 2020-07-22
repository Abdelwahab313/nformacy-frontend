import { useAuth } from './context/auth';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import authManager from '../../services/authManager';
import { logoutUser } from './context/authActions';

const Logout = () => {
  const [_, dispatch] = useAuth();
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  useEffect(() => {
    setLogoutSuccess(true);
    logoutUser(dispatch);
    authManager.logout();
  }, []);

  if (logoutSuccess) {
    return <Redirect push to='/'/>;
  }
  return null;
};

export default Logout;
