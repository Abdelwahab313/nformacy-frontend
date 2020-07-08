import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Grow from '@material-ui/core/Grow';
import WorkExperience from '../components/forms/WorkExperience';
import Education from '../components/forms/Education';
import Certification from '../components/forms/Certification';
import ImageUploader from 'react-images-upload';
import { useFormContext } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import t from '../locales/en/freelancerProfile.json';
import { useStyles } from '../styles/formsStyles';

const StepOne = () => {
  const { cv, setCV } = useFormContext();
  const classes = useStyles();

  const uploadCV = (cv) => {
    setCV(cv);
  };
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
                src={require('../assets/11564-scanner-animation.gif')}
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
            <WorkExperience />
            <Education />
            <Certification />
          </Grid>
        </Grow>
        <Grow in={true} timeout={3500}>
          <Grid item xs={12} md={2} className={classes.imageUploadContainer}>
            <Grid container justify='center' alignItems='flex-start'>
              <ImageUploader
                singleImage={true}
                label={'Accepted File Format: pdf'}
                accept='application/pdf'
                withIcon={true}
                onChange={uploadCV}
                buttonText={t['chooseCV']}
                imgExtension={['.pdf']}
              />
              {cv?.length > 0 && (
                <Typography gutterBottom variant='subtitle2'>
                  {cv[0].name}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grow>
      </Grid>
    </Grid>
  );
};

export default StepOne;
