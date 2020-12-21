import { useAuth } from './context/auth';
import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router';
import authManager from '../../services/authManager';
import { logoutUser } from './context/authActions';
import { RoutesPaths } from 'constants/routesPath';

const Logout = () => {
  const [, dispatch] = useAuth();
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const location = useLocation();
  const isAdminLogin = location.pathname.indexOf('admin') > -1;
  const postLogoutRoute = isAdminLogin ? RoutesPaths.Admin.Home : RoutesPaths.App.Dashboard;

  useEffect(() => {
    setLogoutSuccess(true);
    logoutUser(dispatch);
    authManager.logout();
  }, []);

  if (logoutSuccess) {
    return <Redirect push to={postLogoutRoute}/>;
  }
  return null;
};

export default Logout;
