import React from 'react';
import Grid from '@material-ui/core/Grid';
import CustomTypography from 'components/typography/Typography';
import PageContainer from 'components/grid/PageContainer';
import { Box } from '@material-ui/core';
import authManager from 'services/authManager';
import { Redirect } from 'react-router';
import { getPostVerifyEmailRoute } from 'services/navigation';
import { useTranslation } from 'react-i18next';

const EmailVerificationPending = () => {
  const { t } = useTranslation();
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
        direction={'column'}>
        <Box mt={4}>
          <CustomTypography variant={'h5'}>
            {t('pleaseCheckMail')}
          </CustomTypography>
        </Box>
        <Box mt={2}>
          <CustomTypography variant={'h6'}>
            {t('checkEmailForInstruction')}
          </CustomTypography>
        </Box>
      </Grid>
    </PageContainer>
  );
};

export default EmailVerificationPending;
