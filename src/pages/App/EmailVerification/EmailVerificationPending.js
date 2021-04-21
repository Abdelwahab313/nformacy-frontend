import React from 'react';
import Grid from '@material-ui/core/Grid';
import CustomTypography from 'components/typography/Typography';
import PageContainer from 'components/grid/PageContainer';
import { Box } from '@material-ui/core';
import authManager from 'services/authManager';
import { Redirect } from 'react-router';
import { getPostVerifyEmailRoute } from 'services/navigation';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

const EmailVerificationPending = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const currentUser = authManager.retrieveCurrentUser();
  if (!!currentUser?.isEmailVerified) {
    return <Redirect to={getPostVerifyEmailRoute()} />;
  }

  return (
    <PageContainer>
      <Grid
        container
        alignItems={'center'}
        justify={'center'}
        direction={'column'}
        className={classes.verifyMsg}>
        <Box mt={4}>
          <CustomTypography variant={'h5'}>
            {t('pleaseCheckMail')}
          </CustomTypography>
        </Box>
        <Box mt={2}>
          <CustomTypography variant={'h6'} align={'center'}>
            {t('checkEmailForInstruction')}
          </CustomTypography>
        </Box>
      </Grid>
    </PageContainer>
  );
};

const useStyles = makeStyles(() => ({
  verifyMsg: {
    height: '80vh'
  }
}));

export default EmailVerificationPending;
