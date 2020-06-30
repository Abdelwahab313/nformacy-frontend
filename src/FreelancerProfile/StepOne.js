import PersonalInfo from '../components/forms/PersonalInfo';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

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
        <Grid item xs={12} md={5}>
          <img src={require('../assets/me.gif')} width={'100%'} />
        </Grid>
      </Hidden>
      <Grid item xs={12} md={5}>
        <PersonalInfo />
      </Grid>
    </Grid>
  );
};

export default StepOne;
