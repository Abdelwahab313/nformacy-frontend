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
      spacing={5}
      style={{ height: '100vh' }}>
      <Grid item xs={12} lg={4}>
        <img src={require('../assets/male-female.png')} width={'100%'} />
      </Grid>
      <Grid item xs={12} lg={4}>
        <PersonalInfo />
      </Grid>
    </Grid>
  );
};

export default StepOne;
