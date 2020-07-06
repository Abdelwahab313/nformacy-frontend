import PersonalInfo from '../components/forms/PersonalInfo';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Grow from '@material-ui/core/Grow';
import t from '../locales/en/freelancerProfile.json';

const StepOne = () => {
  return (
    <Grid
      id='stepOneForm'
      container
      direction='row'
      justify='center'
      alignItems='center'
      spacing={5}>
      <Hidden mdDown>
        <Grow in={true} timeout={2000}>
          <Grid item xs={12} md={5}>
            <img
              src={require('../assets/me.gif')}
              width={'100%'}
              alt={t['stepOneImgCaption']}
            />
          </Grid>
        </Grow>
      </Hidden>
      <Grow in={true} timeout={3500}>
        <Grid item xs={12} md={5}>
          <PersonalInfo />
        </Grid>
      </Grow>
    </Grid>
  );
};

export default StepOne;
