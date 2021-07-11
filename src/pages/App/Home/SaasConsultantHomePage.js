import React from 'react';
import { Grid } from '@material-ui/core';
import ProfileSummaryCard from './subComponents/ProfileSummaryCard';
import useStyles from './styles/HomePageStyles';
import CalendarCard from './subComponents/CalendarCard';
import { useAuth } from '../../auth/context/auth';
import Direction from 'components/grid/Direction';
import { CalendarLibraryForMobile } from './subComponents/CalendarLibraryForMobile';
import ConsultantPointsBox from './subComponents/ConsultantPointsBox';
import ConsultantActivityCard from './subComponents/ConsultantActivityCard';
import UserLevelCard from './subComponents/UserLevelCard';
import CalendarCardForTablet from './subComponents/CalendarCardForTablet';
import ProjectsSections from './subComponents/ProjectsSections';
import SaasHomeHeadBar from './subComponents/SaasHomeHeadBar';
import SaasFeedsTimeline from './subComponents/SaasFeedsTimeline';
import SaasLibraryCard from './subComponents/SaasLibraryCard';
import SaasConsultantQuestionRoaster from './subComponents/SaasConsultantQuestionRoaster';

const SaasConsultantHomePage = () => {
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
                <SaasConsultantQuestionRoaster />
              </Grid>
              <Grid item xs={12} md={5}>
                <UserLevelCard />
                <ConsultantPointsBox />
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} className={classes.sectionContainer}>
              <ConsultantActivityCard />
            </Grid>
            <Grid item xs={12} md={12}>
              <CalendarCardForTablet currentUser={currentUser} />
            </Grid>
            <Grid item xs={12} md={12} className={classes.sectionContainer}>
              <CalendarLibraryForMobile />
            </Grid>
            <Grid item xs={12} md={12} className={classes.sectionContainer}>
              <ProjectsSections />
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

export default SaasConsultantHomePage;
