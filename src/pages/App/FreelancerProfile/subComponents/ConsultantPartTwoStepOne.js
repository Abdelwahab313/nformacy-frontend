import React from 'react';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import { useStyles } from 'styles/formsStyles';
import Paper from '@material-ui/core/Paper';
import CV from 'components/forms/CV';
import WorkExperience from 'components/forms/WorkExperience';
import UserPrevProject from 'components/forms/UserPrevProject';

const ConsultantPartTwoStepOne = () => {
  const classes = useStyles();

  return (
    <Grid id='stepThreeForm' container>
      <Grid
        container
        direction='row'
        className={classes.stepThreeContainer}
        alignItems='flex-start'
        justify='center'>
        <Grow in={true} timeout={1000}>
          <Grid
            container
            direction='column'
            justify='flex-start'
            xs={12}
            md={6}>
            <Paper className={classes.paperSection} elevation={5}>
              <CV />
            </Paper>
            <Paper className={classes.paperSection} elevation={5}>
              <WorkExperience />
            </Paper>
            <Paper className={classes.paperSection} elevation={5}>
              <UserPrevProject />
            </Paper>
          </Grid>
        </Grow>
      </Grid>
    </Grid>
  );
};

export default ConsultantPartTwoStepOne;
