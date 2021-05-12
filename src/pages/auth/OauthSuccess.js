import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { fetchUserDetails } from 'apis/userAPI';
import PageContainer from 'components/grid/PageContainer';
import useQueryParams from 'hooks/useQueryParams';
import LoadingCircle from 'components/progress/LoadingCircle';
import { getPostVerifyEmailRoute } from 'services/navigation';
import authManager from 'services/authManager';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { RoutesPaths } from 'constants/routesPath';

const RESPONSE_STATUSES = {
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILING: 'failing',
};

const OauthSuccess = () => {
  const classes = useStyles();
  const [responseState, setResponseState] = useState('');
  const query = useQueryParams();
  const authToken = query.get('token');
  authManager.login(authToken);

  useEffect(() => {
    if (!responseState) {
      setResponseState(RESPONSE_STATUSES.LOADING);
      fetchUserDetails()
        .then((response) => {
          if (response?.status === 200) {
            authManager.updateUser({ ...response.data });
          }
          setResponseState(RESPONSE_STATUSES.SUCCESS);
        })
        .catch(() => {
          setResponseState(RESPONSE_STATUSES.FAILING);
        });
    }
  }, [responseState]);

  if (responseState === RESPONSE_STATUSES.LOADING) {
    return <LoadingCircle />;
  } else if (responseState === RESPONSE_STATUSES.SUCCESS) {
    window.location.replace(getPostVerifyEmailRoute());
  } else if (responseState === RESPONSE_STATUSES.FAILING) {
    window.location.replace(RoutesPaths.App.Logout);
  }

  return (
    <PageContainer>
      <Grid
        container
        alignItems={'center'}
        justify={'center'}
        direction={'column'}
        className={classes.verifyMsg}>
        {responseState === RESPONSE_STATUSES.FAILING && (
          <Redirect to={RoutesPaths.App.Logout} />
        )}
      </Grid>
    </PageContainer>
  );
};
const useStyles = makeStyles(() => ({
  verifyMsg: {
    height: '80vh',
  },
}));
export default OauthSuccess;
