import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Grid } from '@material-ui/core';
import ProfileSummaryCard from './ProfileSummaryCard';
import useStyles from './styles/HomePageStyles';
import CalendarCard from './CalendarCard';
import { useAuth } from '../../auth/context/auth';
import SuccessSnackBar from '../../../components/Snackbar/SuccessSnackBar';
import { useLocation } from 'react-router';

const HomePage = () => {
  const classes = useStyles();
  const [{ currentUser }] = useAuth();

  return (
    <Grid container>
      <Grid item lg={3} className={classes.sidebar}>
        <ProfileSummaryCard/>

        <CalendarCard currentUser={currentUser}/>
      </Grid>
      <Grid item lg>
        <Box mt={8}>
          <Typography variant='h4' align='center'>
            Welcome to Medad! 🎉
          </Typography>
        </Box>
      </Grid>
      <Grid item lg={3}>
      </Grid>
    </Grid>
  );
};

export default HomePage;
