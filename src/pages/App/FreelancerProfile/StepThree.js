import React from 'react';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import WorkExperience from '../../../components/forms/WorkExperience';
import Education from '../../../components/forms/Education';
import Certification from '../../../components/forms/Certification';
import { useStyles } from '../../../styles/formsStyles';
import Paper from '@material-ui/core/Paper';
import CV from '../../../components/forms/CV';

const StepThree = () => {
  const classes = useStyles();

  return (
    <Grid id='stepThreeForm' container>
      <Grid
        container
        direction='row'
        className={classes.stepThreeContainer}
        alignItems='flex-start'
        justify='center'
        spacing={5}>
        <Grow in={true} timeout={3500}>
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
              <Education />
            </Paper>
            <Paper className={classes.paperSection} elevation={5}>
              <Certification />
            </Paper>
          </Grid>
        </Grow>
      </Grid>
    </Grid>
  );
};

export default StepThree;
