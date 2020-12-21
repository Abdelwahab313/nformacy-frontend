import { Grid } from '@material-ui/core';
import React from 'react';
import LandingRollerSection from './LandingRollerSection';
import OurSolutionsSection from './OurSolutionsSection';
import useStyles from './styles/LandingPageStyles';

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Grid container justify='center' className={classes.landingContainer}>
      <LandingRollerSection />
      <OurSolutionsSection/>
    </Grid>
  );
};

export default LandingPage;
