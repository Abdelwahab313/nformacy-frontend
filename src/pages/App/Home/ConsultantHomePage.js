import React from 'react';
import { Grid, Box } from '@material-ui/core';
import ProfileSummaryCard from './subComponents/ProfileSummaryCard';
import useStyles from './styles/HomePageStyles';
import CalendarCard from './subComponents/CalendarCard';
import { useAuth } from '../../auth/context/auth';
import { useTranslation } from 'react-i18next';
import SubmitButton from 'components/buttons/SubmitButton';
import ActivityTable from './subComponents/ActivityTable';
import FeedsTimeline from './subComponents/FeedsTimeline';
import Direction from 'components/grid/Direction';
import LibraryCard from './subComponents/LibraryCard';
import { CalendarLibraryForMobile } from './subComponents/CalendarLibraryForMobile';
import HomeHeadBar from './subComponents/HomeHeadBar';
import ConsultantQuestionRoaster from './subComponents/ConsultantQuestionRoaster';

const ConsultantHomePage = () => {
  const classes = useStyles();
  const [{ currentUser }] = useAuth();
  const { t } = useTranslation();

  return (
    <Direction>
      <Grid container justify='center'>
        <HomeHeadBar />
        <Grid container className={classes.clientHomeContainer} spacing={4}>
          <Grid item xs={12} md={3}>
            <ProfileSummaryCard />
            <CalendarCard currentUser={currentUser} />
            <LibraryCard />
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={9}>
                <ConsultantQuestionRoaster />
              </Grid>

              <Grid item xs={12} md={3}>
                <Box className={[classes.askQuestionBox, classes.pointsBox]}>
                  <Grid
                    container
                    direction='column'
                    alignItems='center'
                    justify='space-evenly'
                    className={classes.pointsContainer}>
                    <img
                      className={[classes.walletIcon]}
                      color={'primary'}
                      src={require('../../../assets/wallet.svg')}
                      width={'25%'}
                    />
                    <div className={classes.marginBottom}>Ana consultant</div>
                    <SubmitButton
                      id={'proceedBtn'}
                      onClick={() => {}}
                      className={[classes.chargeBtn]}
                      buttonText={t('chargeMyWallet')}
                    />
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} className={classes.sectionContainer}>
              <ActivityTable />
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
