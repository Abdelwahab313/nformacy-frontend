import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Grid } from '@material-ui/core';
import ProfileSummaryCard from './ProfileSummaryCard';
import useStyles from './styles/HomePageStyles';
import CalendarCard from './CalendarCard';
import { CalendarProvider } from '../Calendar/Context/CalendarContext';

const HomePage = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('user'));


  return (
    <Grid container>
      <Grid item lg={3} className={classes.sidebar}>
        <ProfileSummaryCard/>
        <CalendarProvider initialValue={{
          isInteractable: false,
          availableDates: !!user.freeDates ? user.freeDates : [],
        }}>
          <CalendarCard/>
        </CalendarProvider>
      </Grid>
      <Grid item lg>
        <Box mt={8}>
          <Typography variant='h4' align='center'>
            Welcome to Medad! 🎉
          </Typography>
        </Box>
      </Grid>
      <Grid item lg={3}>
        {/*<Typography>Hello</Typography>*/}
      </Grid>
    </Grid>
  );
};

export default HomePage;
