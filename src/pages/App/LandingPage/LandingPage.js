import { Grid } from '@material-ui/core';
import React from 'react';
import HowWeWorkSection from './HowWeWorkSection';
import AreasOfSpeciality from './AreasOfSpeciality';
import LandingRollerSection from './LandingRollerSection';
import OurSolutionsSection from './OurSolutionsSection';
import useStyles from './styles/LandingPageStyles';
import OurPromiseSection from './OurPromiseSection';
import GlobalCommunitySection from './GlobalCommunitySection';
// import AdvisoryBoardSection from './AdvisoryBoardSection';
import MobileHowWeWorkSection from './MobileHowWeWorkSection';
import ServeYouBtnSection from './ServeYouBtnSection';

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Grid container justify='center' className={classes.landingContainer}>
      <LandingRollerSection />
      <OurSolutionsSection />
      <HowWeWorkSection />
      <MobileHowWeWorkSection />
      <AreasOfSpeciality />
      <GlobalCommunitySection />
      <OurPromiseSection />
      {/* <AdvisoryBoardSection /> */}
      <ServeYouBtnSection />
    </Grid>
  );
};

export default LandingPage;
