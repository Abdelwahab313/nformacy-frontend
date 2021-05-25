import React from 'react';
import { Grid } from '@material-ui/core';
import ProfileSummaryCard from './subComponents/ProfileSummaryCard';
import useStyles from './styles/HomePageStyles';
import CalendarCard from './subComponents/CalendarCard';
import { useAuth } from '../../auth/context/auth';
import FeedsTimeline from './subComponents/FeedsTimeline';
import Direction from 'components/grid/Direction';
import LibraryCard from './subComponents/LibraryCard';
import { CalendarLibraryForMobile } from './subComponents/CalendarLibraryForMobile';
import HomeHeadBar from './subComponents/HomeHeadBar';
import ConsultantQuestionRoaster from './subComponents/ConsultantQuestionRoaster';
import ConsultantPointsBox from './subComponents/ConsultantPointsBox';
import ConsultantActivityTable from './subComponents/ConsultantActivityTable';
import UserLevelCard from './subComponents/UserLevelCard';
import CalendarCardForTablet from './subComponents/CalendarCardForTablet';

const ConsultantHomePage = () => {
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
            <LibraryCard />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <ConsultantQuestionRoaster />
              </Grid>
              <Grid item xs={12} md={5}>
                <UserLevelCard />
                <ConsultantPointsBox />
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} className={classes.sectionContainer}>
              <ConsultantActivityTable />
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

export default ConsultantHomePage;
