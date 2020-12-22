import { Grid } from '@material-ui/core';
import React from 'react';
import HowWeWorkSection from './HowWeWorkSection';
import LandingRollerSection from './LandingRollerSection';
import OurSolutionsSection from './OurSolutionsSection';
import useStyles from './styles/LandingPageStyles';

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Grid container justify='center' className={classes.landingContainer}>
      <LandingRollerSection />
      <OurSolutionsSection />
      <HowWeWorkSection />
    </Grid>
  );
};

export default LandingPage;
