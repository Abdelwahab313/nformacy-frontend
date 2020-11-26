import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import SubmitButton from 'components/buttons/SubmitButton';
import useStyles from '../styles/HomePageStyles';
import CustomTypography from 'components/typography/Typography';

const RankBox = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box className={[classes.askQuestionBox, classes.marginBottom]}>
      <Grid
        container
        direction='column'
        alignItems='center'
        justify='space-evenly'
        className={classes.pointsContainer}>
        <img
          className={[classes.walletIcon]}
          color={'primary'}
          src={require('../../../../assets/img/rank.png')}
          width={'25%'}
        />
        <CustomTypography variant='body1' fontWeight='bold'>
          {t('yourRank')}
        </CustomTypography>
        <SubmitButton
          id={'proceedBtn'}
          onClick={() => {}}
          className={classes.proceedBtn}
          buttonText={
            <CustomTypography variant='body1'>
              {t('raiseRank')}
            </CustomTypography>
          }
        />
      </Grid>
    </Box>
  );
};

export default RankBox;