import React from 'react';
import { Grid } from '@material-ui/core';
import ProfileSummaryCard from './subComponents/ProfileSummaryCard';
import useStyles from './styles/HomePageStyles';
import CalendarCard from './subComponents/CalendarCard';
import { useAuth } from '../../auth/context/auth';
import AvailableServiceSection from './subComponents/AvailableServices';
import Direction from 'components/grid/Direction';
import { CalendarLibraryForMobile } from './subComponents/CalendarLibraryForMobile';
import HomeHeadBar from './subComponents/HomeHeadBar';
import AskTheExpertSection from './subComponents/AskTheExpertSection';
import PointsBox from './subComponents/PointsBox';
import ManageMyAccounts from './subComponents/ManageMyAccounts';
import FeedsTimeline from './subComponents/FeedsTimeline';
import CalendarCardForTablet from './subComponents/CalendarCardForTablet';
import CorporateActivityCard from './subComponents/CorporateActivityCard';

const CorporateHomePage = () => {
  const classes = useStyles();
  const [{ currentUser }] = useAuth();

  return (
    <Direction>
      <Grid container justify='center'>
        <HomeHeadBar />
        <Grid container className={classes.clientHomeContainer} spacing={4}>
          <Grid item xs={12} md={4}>
            <ProfileSummaryCard />
            <CalendarCard currentUser={currentUser} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <AskTheExpertSection />
              </Grid>
              <Grid item xs={12} md={5}>
                <PointsBox />
              </Grid>
            </Grid>
            <Grid container spacing={4} className={classes.sectionContainer}>
              <Grid item xs={12} md={8}>
                <AvailableServiceSection />
              </Grid>
              <Grid item xs={12} md={4}>
                <ManageMyAccounts />
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} className={classes.sectionContainer}>
              <CorporateActivityCard />
            </Grid>
            <Grid item xs={12} md={12} >
              <CalendarCardForTablet currentUser={currentUser} />
            </Grid>
            <Grid item xs={12} md={12} className={classes.sectionContainer}>
              <CalendarLibraryForMobile />
            </Grid>
            <Grid item xs={12} md={12} className={classes.sectionContainer}>
              <FeedsTimeline />
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </Direction>
  );
};

export default CorporateHomePage;
