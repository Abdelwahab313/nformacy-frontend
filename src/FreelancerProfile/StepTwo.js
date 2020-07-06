import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Grow from '@material-ui/core/Grow';
import FieldsOfSpecialization from '../components/forms/FieldsOfSpecialization';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import Typography from '@material-ui/core/Typography';
import { iconStyle, useStyles } from '../styles/formsStyles';
import AssignmentPreferences from '../components/forms/AssignmentPreferences';
import t from '../locales/en/freelancerProfile.json';

const StepTwo = () => {
  const classes = useStyles();
  return (
    <Grid id='stepTwoForm' container>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={5}>
        <Hidden mdDown>
          <Grow in={true} timeout={2000}>
            <Grid item xs={12} md={3}>
              <img src={require('../assets/Clipboard.gif')} width={'100%'} />
            </Grid>
          </Grow>
        </Hidden>
        <Grow in={true} timeout={3500}>
          <Grid item xs={12} md={5}>
            <FieldsOfSpecialization />
          </Grid>
        </Grow>
        <Grow in={true} timeout={4500}>
          <Grid item xs={12} md={2}>
            <Grid
              container
              direction='column'
              justify={'center'}
              className={classes.hintContainer}>
              <BusinessCenterIcon fontSize='large' style={iconStyle} />
              <Typography
                variant='subtitle1'
                gutterBottom
                className={classes.hintText}>
                {t['fieldsOfSpecializationHint']}
              </Typography>
            </Grid>
          </Grid>
        </Grow>
      </Grid>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={5}>
        <Grid item xs={12} md={3}></Grid>
        <Grow in={true} timeout={5500}>
          <Grid item xs={12} md={5}>
            <AssignmentPreferences />
          </Grid>
        </Grow>
        <Grow in={true} timeout={6500}>
          <Grid item xs={12} md={2}>
            <img
              src={require('../assets/hello.png')}
              alt='hello'
              style={{ height: 'auto', width: '100%' }}
            />
          </Grid>
        </Grow>
      </Grid>
    </Grid>
  );
};

export default StepTwo;
