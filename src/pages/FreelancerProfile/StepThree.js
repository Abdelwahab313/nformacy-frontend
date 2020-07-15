import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Grow from '@material-ui/core/Grow';
import WorkExperience from '../../components/forms/WorkExperience';
import Education from '../../components/forms/Education';
import Certification from '../../components/forms/Certification';
import ImageUploader from 'react-images-upload';
import { useFormContext } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import t from '../../locales/en/freelancerProfile.json';
import { useStyles } from '../../styles/formsStyles';
import Paper from '@material-ui/core/Paper';
import CV from '../../components/forms/CV';

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
        <Hidden smDown>
          <Grow in={true} timeout={2000}>
            <Grid item xs={12} sm={3}>
              <img
                src={require('../../assets/11564-scanner-animation.gif')}
                width={'100%'}
              />
            </Grid>
          </Grow>
        </Hidden>
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
