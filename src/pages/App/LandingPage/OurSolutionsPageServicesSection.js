import { Box, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import SolutionsAvailableServices from '../Home/subComponents/SolutionsAvailableServices';
import useStyles from './styles/LandingPageStyles';

const OurSolutionsPageServicesSection = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid
      container
      direction='row'
      justify='center'
      className={[
        classes.landingSectionsContainerPadding,
        classes.lighterGrayContainer,
      ]}>
      <Grid item xs={10} md={12}>
        <Box textAlign='center' id='our_solution'>
          <CustomTypography variant='h4' fontWeight='bold'>
            {t('ourSolutions')}
          </CustomTypography>
          <CustomTypography variant='h5' className={classes.subTextMargin}>
          {t('ourSolutionsDesc')}
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={12} className={classes.subTextMargin}>
        <SolutionsAvailableServices />
      </Grid>
    </Grid>
  );
};

export default OurSolutionsPageServicesSection;
