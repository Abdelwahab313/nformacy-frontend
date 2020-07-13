import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Grid } from '@material-ui/core';
import ProfileSummaryCard from './ProfileSummaryCard';
import useStyles from './styles/HomePageStyles';

const HomePage = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item md={3} className={classes.sidebar}>
        <ProfileSummaryCard/>
      </Grid>
      <Grid item md={6}>
        <Box mt={8}>
          <Typography variant='h4' align='center'>
            Welcome to Medad! 🎉
          </Typography>
        </Box>
      </Grid>
      <Grid item md={3}>
        <Typography>Hello</Typography>
      </Grid>
    </Grid>
  );
};

export default HomePage;
