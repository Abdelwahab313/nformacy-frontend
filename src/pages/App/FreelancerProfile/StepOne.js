import PersonalInfo from '../../../components/forms/PersonalInfo';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import { useStyles } from '../../../styles/formsStyles';
import Paper from '@material-ui/core/Paper';

const StepOne = () => {
  const classes = useStyles();
  return (
    <Grid
      id='stepOneForm'
      container
      direction='row'
      justify='center'
      alignItems='center'
      spacing={5}>
      <Grow in={true} timeout={3500}>
        <Grid item xs={12} sm={7} lg={5}>
          <Paper className={classes.paperSection} elevation={3}>
            <PersonalInfo />
          </Paper>
        </Grid>
      </Grow>
    </Grid>
  );
};

export default StepOne;
