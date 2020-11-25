import React from 'react';
import authManager from 'services/authManager';
import ClientHomePage from './ClientHomePage';
import ConsultantHomePage from './ConsultantHomePage';

const HomePage = () => {
  if (authManager.isClient()) {
    return <ClientHomePage />;
  } else {
    return <ConsultantHomePage />;
  }
};

export default HomePage;
