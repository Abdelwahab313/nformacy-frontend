import React from 'react';
import { Grid } from '@material-ui/core';
import ProfileSummaryCard from './subComponents/ProfileSummaryCard';
import useStyles from './styles/HomePageStyles';
import CalendarCard from './subComponents/CalendarCard';
import { useAuth } from '../../auth/context/auth';
import AvailableServiceSection from './subComponents/AvailableServices';
import ClientActivityCard from './subComponents/ClientActivityCard';
import Direction from 'components/grid/Direction';
import { CalendarLibraryForMobile } from './subComponents/CalendarLibraryForMobile';
import AskTheExpertSection from './subComponents/AskTheExpertSection';
import MobileAvailableServiceSection from './subComponents/MobileAvailableServiceSection';
import CalendarCardForTablet from './subComponents/CalendarCardForTablet';
import SaasHomeHeadBar from './subComponents/SaasHomeHeadBar';
import SaasPointsBox from './subComponents/SaasPointsBox';
import SaasFeedsTimeline from './subComponents/SaasFeedsTimeline';
import SaasLibraryCard from './subComponents/SaasLibraryCard';

const SaasClientHomePage = () => {
  const classes = useStyles();
  const [{ currentUser }] = useAuth();

  return (
    <Direction>
      <Grid container justify='center'>
        <SaasHomeHeadBar />
        <Grid container className={classes.clientHomeContainer} spacing={4}>
          <Grid item xs={12} md={4}>
            <ProfileSummaryCard />
            <CalendarCard currentUser={currentUser} />
            <SaasLibraryCard />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <AskTheExpertSection />
              </Grid>
              <Grid item xs={12} md={5}>
                <SaasPointsBox />
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} className={classes.sectionContainer}>
              <AvailableServiceSection />
              <MobileAvailableServiceSection />
            </Grid>
            <Grid item xs={12} md={12} className={classes.sectionContainer}>
              <ClientActivityCard />
            </Grid>
            <Grid item xs={12} md={12}>
              <CalendarCardForTablet currentUser={currentUser} />
            </Grid>
            <Grid item xs={12} md={12} className={classes.sectionContainer}>
              <CalendarLibraryForMobile />
            </Grid>
            <Grid item xs={12} md={12} className={classes.sectionContainer}>
              <SaasFeedsTimeline />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Direction>
  );
};

export default SaasClientHomePage;
