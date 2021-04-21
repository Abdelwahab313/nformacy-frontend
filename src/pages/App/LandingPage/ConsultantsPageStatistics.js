import { Box, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import useStyles from './styles/LandingPageStyles';
import { useTranslation } from 'react-i18next';

const ConsultantsPageStatistics = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='flex-end'
      className={classes.serveYouPadding}>
      <Grid item xs={12} md={3}>
        <Box textAlign='center'>
          <CustomTypography
            variant='h1'
            fontWeight='bold'
            className={classes.mediumTurquoiseTxt}>
            {t('plus200')}
          </CustomTypography>
          <CustomTypography variant='h4' fontWeight='bold'>
            {t('consultants')}
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box textAlign='center'>
          <CustomTypography
            variant='h1'
            fontWeight='bold'
            className={classes.mediumTurquoiseTxt}>
            {t('plus30')}
          </CustomTypography>
          <CustomTypography variant='h4' fontWeight='bold'>
            {t('nationalities')}
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box textAlign='center'>
          <CustomTypography
            variant='h1'
            fontWeight='bold'
            className={classes.mediumTurquoiseTxt}>
            {t('plus19')}
          </CustomTypography>
          <CustomTypography variant='h4' fontWeight='bold'>
            {t('spokenLanguages')}
          </CustomTypography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ConsultantsPageStatistics;
