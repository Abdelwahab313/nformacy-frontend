import React, { Fragment, useState } from 'react';
import { fetchUserDetails } from 'apis/userAPI';
import { useAuth } from 'pages/auth/context/auth';
import { updateUser } from 'pages/auth/context/authActions';
import { useQuery } from 'react-query';
import authManager from 'services/authManager';
import { immortalQueryConfig } from 'settings';
import ClientHomePage from './ClientHomePage';
import ConsultantHomePage from './ConsultantHomePage';
import SuccessDialogPage from '../FreelancerProfile/SuccessDialogPage';
import LoadingCircle from 'components/progress/LoadingCircle';
import { useHistory, useLocation } from 'react-router';

const HomePage = () => {
  const [, dispatch] = useAuth();
  const location = useLocation();
  const history = useHistory();
  const isRecentlyRegistered = location?.state?.isRecentlyRegistered;
  const [open, setOpen] = useState(isRecentlyRegistered);
  const handleClose = () => {
    setOpen(false);
    history.replace();
  };

  const { isFetching } = useQuery('userDetails', fetchUserDetails, {
    ...immortalQueryConfig,
    staleTime: 'Infinity',
    onSuccess: (response) => {
      updateUser(dispatch, response.data);
    },
  });
  if (isFetching) {
    return <LoadingCircle />;
  }

  if (authManager.isClient()) {
    return (
      <Fragment>
        <ClientHomePage />
        <SuccessDialogPage open={open} handleClose={handleClose} />
      </Fragment>
    );
  } else {
    return <ConsultantHomePage />;
  }
};

export default HomePage;
