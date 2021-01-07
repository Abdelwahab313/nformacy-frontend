import { Box, Grid } from '@material-ui/core';
import LinkText from 'components/typography/LinkText';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import LandingAvailableServices from '../Home/subComponents/LandingAvailableServices';
import useStyles from './styles/LandingPageStyles';

const OurSolutionsSection = () => {
  const classes = useStyles();

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
            Our Solutions
          </CustomTypography>
          <CustomTypography variant='h5' className={classes.subTextMargin}>
            Choose the solution that meets your consultancy needs, from a single
            bite of advice up-to full project
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={12} className={classes.subTextMargin}>
        <LandingAvailableServices />
      </Grid>
      <Grid item xs={10} md={3}>
        <Box textAlign='center' className={classes.mainCtaBtn}>
          <LinkText to={''} className={classes.primaryBoldTxt}>
            Read More
          </LinkText>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OurSolutionsSection;
