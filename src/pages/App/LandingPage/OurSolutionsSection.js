import { Box, Grid } from '@material-ui/core';
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
        classes.ourSolutionContainer,
      ]}>
      <Grid item xs={12}>
        <Box textAlign='center'>
          <CustomTypography variant='h4' fontWeight='bold'>
            Our Solutions
          </CustomTypography>
          <CustomTypography variant='h5' className={classes.subTextMargin}>
            Choose the solution that meets your consultancy needs, from a single
            bite of advice up-to full project
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <LandingAvailableServices/>
      </Grid>
    </Grid>
  );
};

export default OurSolutionsSection;
