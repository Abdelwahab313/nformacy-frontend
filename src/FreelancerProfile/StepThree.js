import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Grow from '@material-ui/core/Grow';
import WorkExperience from '../components/forms/WorkExperience';
import Education from '../components/forms/Education';
import Certification from '../components/forms/Certification';

const StepOne = () => {
  return (
    <Grid id='stepThreeForm' container>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={5}>
        <Hidden mdDown>
          <Grow in={true} timeout={2000}>
            <Grid item xs={12} md={3}>
              <img
                src={require('../assets/11564-scanner-animation.gif')}
                width={'100%'}
              />
            </Grid>
          </Grow>
        </Hidden>
        <Grow in={true} timeout={3500}>
          <Grid item xs={12} md={5}>
            <WorkExperience />
          </Grid>
        </Grow>
        <Grow in={true} timeout={3500}>
          <Grid item xs={12} md={2}></Grid>
        </Grow>
      </Grid>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={5}>
        <Hidden mdDown>
          <Grow in={true} timeout={2000}>
            <Grid item xs={12} md={3}></Grid>
          </Grow>
        </Hidden>
        <Grow in={true} timeout={3500}>
          <Grid item xs={12} md={5}>
            <Education />
          </Grid>
        </Grow>
        <Grow in={true} timeout={3500}>
          <Grid item xs={12} md={2}></Grid>
        </Grow>
      </Grid>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={5}>
        <Hidden mdDown>
          <Grow in={true} timeout={2000}>
            <Grid item xs={12} md={3}></Grid>
          </Grow>
        </Hidden>
        <Grow in={true} timeout={3500}>
          <Grid item xs={12} md={5}>
            <Certification />
          </Grid>
        </Grow>
        <Grow in={true} timeout={3500}>
          <Grid item xs={12} md={2}></Grid>
        </Grow>
      </Grid>
    </Grid>
  );
};

export default StepOne;
