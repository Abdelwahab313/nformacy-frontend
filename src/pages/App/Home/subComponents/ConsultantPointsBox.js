import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import SubmitButton from 'components/buttons/SubmitButton';
import useStyles from '../styles/HomePageStyles';
import CustomTypography from 'components/typography/Typography';
import authManager from 'services/authManager';

const ConsultantPointsBox = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const currentUser = authManager.retrieveCurrentUser();
  const earnedPoints = !!currentUser?.points ? currentUser?.points : 0;
  return (
    <Box
      className={[
        classes.askQuestionBox,
        classes.pointsBox,
        classes.displayDesktop,
      ]}>
      <Grid
        container
        direction='column'
        alignItems='center'
        justify='space-evenly'
        className={classes.pointsContainer}>
        <img
          className={[classes.walletIcon]}
          color={'primary'}
          src={require('../../../../assets/wallet.svg')}
          width={'25%'}
        />
        <CustomTypography variant='body1' fontWeight='bold'>
          {`${t('youHave')} ${earnedPoints} ${t('points')}`}
        </CustomTypography>
        <SubmitButton
          id={'proceedBtn'}
          onClick={() => {}}
          className={[classes.chargeBtn]}
          buttonText={
            <CustomTypography variant='body1'>
              {t('learnMore')}
            </CustomTypography>
          }
        />
      </Grid>
    </Box>
  );
};

export default ConsultantPointsBox;
