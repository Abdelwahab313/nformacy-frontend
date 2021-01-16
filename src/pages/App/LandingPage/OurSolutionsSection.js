import { Box, Grid } from '@material-ui/core';
import LinkText from 'components/typography/LinkText';
import CustomTypography from 'components/typography/Typography';
import { RoutesPaths } from 'constants/routesPath';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LandingAvailableServices from '../Home/subComponents/LandingAvailableServices';
import useStyles from './styles/LandingPageStyles';

const OurSolutionsSection = () => {
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
        <LandingAvailableServices />
      </Grid>
      <Grid item xs={10} md={3}>
        <Box textAlign='center' className={classes.mainCtaBtn}>
          <LinkText
            to={RoutesPaths.App.Solutions}
            className={classes.primaryBoldTxt}>
            {t('seeMore')}
          </LinkText>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OurSolutionsSection;
