import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CustomTypography from 'components/typography/Typography';
import { verifyEmail } from 'apis/userAPI';
import PageContainer from 'components/grid/PageContainer';
import useQueryParams from 'hooks/useQueryParams';
import { Box } from '@material-ui/core';
import LoadingCircle from 'components/progress/LoadingCircle';
import SubmitButton from 'components/buttons/SubmitButton';
import { getPostVerifyEmailRoute, history } from 'services/navigation';
import authManager from 'services/authManager';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

const RESPONSE_STATUSES = {
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILING: 'failing',
};

const VerifyEmail = () => {
  const [reponseState, setResponseState] = useState('');
  const query = useQueryParams();
  const emailToken = query.get('token');
  const currentUser = authManager.retrieveCurrentUser;
  const classes = useStyles();

  useEffect(() => {
    if (!reponseState) {
      setResponseState(RESPONSE_STATUSES.LOADING);
      verifyEmail(emailToken)
        .then((response) => {
          if (response?.status === 200) {
            authManager.updateUser({ ...currentUser, isEmailVerified: true });
          }
          setResponseState(RESPONSE_STATUSES.SUCCESS);
        })
        .catch(() => {
          setResponseState(RESPONSE_STATUSES.FAILING);
        });
    }
  }, [reponseState]);

  if (reponseState === RESPONSE_STATUSES.LOADING) {
    return <LoadingCircle />;
  }

  const onClickContinueButton = () => {
    history.push(getPostVerifyEmailRoute());
  };

  let message = '';
  if (
    reponseState === RESPONSE_STATUSES.SUCCESS ||
    !!currentUser?.isEmailVerified
  ) {
    message = 'Your Email has been verified';
  } else {
    message = 'Something Went Wrong with the token';
  }

  return (
    <PageContainer>
      <Grid
        container
        alignItems={'center'}
        justify={'center'}
        direction={'column'}
        className={classes.verifyMsg}>
        {reponseState === RESPONSE_STATUSES.SUCCESS && (
          <>
            <Box mt={8}>
              <CustomTypography variant={'h5'}>{message}</CustomTypography>
            </Box>
            <Box mt={2}>
              <SubmitButton
                buttonText='continue to nformacy'
                onClick={onClickContinueButton}
              />
            </Box>
          </>
        )}
        {reponseState === RESPONSE_STATUSES.FAILING && (
          <Redirect to={getPostVerifyEmailRoute()} />
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
export default VerifyEmail;
