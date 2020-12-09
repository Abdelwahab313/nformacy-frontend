import React from 'react';
import { fetchUserDetails } from 'apis/userAPI';
import { useAuth } from 'pages/auth/context/auth';
import { updateUser } from 'pages/auth/context/authActions';
import { useQuery } from 'react-query';
import authManager from 'services/authManager';
import { immortalQueryConfig } from 'settings';
import ClientHomePage from './ClientHomePage';
import ConsultantHomePage from './ConsultantHomePage';

const HomePage = () => {
  const [, dispatch] = useAuth();

  useQuery('userDetails', fetchUserDetails, {
    ...immortalQueryConfig,
    staleTime: 'Infinity',
    onSuccess: (response) => {
      updateUser(dispatch, response.data);
    },
  });

  if (authManager.isClient()) {
    return <ClientHomePage />;
  } else {
    return <ConsultantHomePage />;
  }
};

export default HomePage;
