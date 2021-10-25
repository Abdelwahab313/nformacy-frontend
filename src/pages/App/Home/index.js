import React, { Fragment, useState } from 'react';
import { fetchUserDetails } from 'apis/userAPI';
import { useAuth } from 'pages/auth/context/auth';
import { updateUser } from 'pages/auth/context/authActions';
import { useQuery } from 'react-query';
import authManager from 'services/authManager';
import { immortalQueryConfig, IS_Nformacy_APP } from 'settings';
import SuccessDialogPage from './subComponents/SuccessDialogPage';
import LoadingCircle from 'components/progress/LoadingCircle';
import { useHistory, useLocation } from 'react-router';
import SaasClientHomePage from './SaasClientHomePage';
import SaasConsultantHomePage from './SaasConsultantHomePage';
import SaasCorporateHomePage from './SaasCorporateHomePage';
import ClientHomePage from './ClientHomePage';
import CorporateHomePage from './CorporateHomePage';
import ConsultantHomePage from './ConsultantHomePage';

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

  const handleHomePage = () => {
    if (!!authManager.isOnlyClient()) {
      return IS_Nformacy_APP ? <ClientHomePage /> : <SaasClientHomePage />;
    } else if (!!authManager.isCorporate()) {
      return IS_Nformacy_APP ? (
        <CorporateHomePage />
      ) : (
        <SaasCorporateHomePage />
      );
    } else {
      return IS_Nformacy_APP ? (
        <ConsultantHomePage />
      ) : (
        <SaasConsultantHomePage />
      );
    }
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
  return (
    <Fragment>
      {handleHomePage()}
      <SuccessDialogPage open={open} handleClose={handleClose} />
    </Fragment>
  );
};

export default HomePage;
