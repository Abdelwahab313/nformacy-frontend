import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Grow from '@material-ui/core/Grow';
import FieldsOfSpecialization from '../components/forms/FieldsOfSpecialization';
import { useFormContext } from 'react-hook-form';

const StepTwo = () => {

  const { errors, control, user } = useFormContext();

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
            <img src={require('../assets/Clipboard.gif')} width={'100%'}/>
          </Grid>
        </Grow>
      </Hidden>
      <Grow in={true} timeout={3500}>
        <Grid item xs={12} md={5}>
          <FieldsOfSpecialization/>
        </Grid>
      </Grow>
    </Grid>
  );
};

export default StepTwo;
