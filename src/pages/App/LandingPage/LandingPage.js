import { Grid } from '@material-ui/core';
import React from 'react';
import HowWeWorkSection from './HowWeWorkSection';
import AreasOfSpeciality from './AreasOfSpeciality';
import LandingRollerSection from './LandingRollerSection';
import OurSolutionsSection from './OurSolutionsSection';
import useStyles from './styles/LandingPageStyles';
import OurPromiseSection from './OurPromiseSection';
import GlobalCommunitySection from './GlobalCommunitySection';

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Grid container justify='center' className={classes.landingContainer}>
      <LandingRollerSection />
      <OurSolutionsSection />
      <HowWeWorkSection />
      <AreasOfSpeciality />
      <GlobalCommunitySection />
      <OurPromiseSection />
    </Grid>
  );
};

export default LandingPage;
