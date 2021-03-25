import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import SubmitButton from 'components/buttons/SubmitButton';
import useStyles from '../styles/HomePageStyles';
import CustomTypography from 'components/typography/Typography';
import authManager from 'services/authManager';
import { useHistory } from 'react-router';
import { RoutesPaths } from 'constants/routesPath';

const ManageMyAccounts = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
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
        <SubmitButton
          id={'proceedBtn'}
          onClick={() => { history.push(RoutesPaths.App.Accounts); }}
          className={[classes.chargeBtn]}
          buttonText={
            <CustomTypography variant='body1'>
              {authManager.isCorporate() && t('manageMyAccounts')}
            </CustomTypography>
          }
        />
      </Grid>
    </Box>
  );
};

export default ManageMyAccounts;
