import { Grid } from '@material-ui/core';
import React from 'react';
import HowWeWorkSection from './HowWeWorkSection';
import AreasOfSpeciality from './AreasOfSpeciality';
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
      <AreasOfSpeciality />
    </Grid>
  );
};

export default LandingPage;
