import React from 'react';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import FieldsOfSpecialization from 'components/forms/FieldsOfSpecialization';
import { useStyles } from 'styles/formsStyles';
import Paper from '@material-ui/core/Paper';

const StepTwo = () => {
  const classes = useStyles();
  return (
    <Grid id='stepTwoForm' container>
      <Grid
        container
        className={classes.stepTwoContainer}
        direction='row'
        justify='space-evenly'
        alignItems='center'>
        <Grow in={true} timeout={1000}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paperSection} elevation={5}>
              <FieldsOfSpecialization />
            </Paper>
          </Grid>
        </Grow>
      </Grid>
    </Grid>
  );
};

export default StepTwo;
