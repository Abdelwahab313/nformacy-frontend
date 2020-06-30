import PersonalInfo from '../components/forms/PersonalInfo';
import React from 'react';
import Grid from '@material-ui/core/Grid';

const StepOne = () => {
  return (
    <Grid
      id='stepOneForm'
      container
      direction='row'
      justify='center'
      alignItems='center'
      spacing={5}>
      <Grid item xs={12} lg={5}>
        <img src={require('../assets/me.gif')} width={'100%'} />
      </Grid>
      <Grid item xs={12} lg={5}>
        <PersonalInfo />
      </Grid>
    </Grid>
  );
};

export default StepOne;
