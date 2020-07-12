import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Grow from '@material-ui/core/Grow';
import FieldsOfSpecialization from '../../components/forms/FieldsOfSpecialization';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import Typography from '@material-ui/core/Typography';
import { iconStyle, useStyles } from '../../styles/formsStyles';
import t from '../../locales/en/freelancerProfile.json';
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
        alignItems='center'
        spacing={5}>
        <Hidden smDown>
          <Grow in={true} timeout={2000}>
            <Grid item xs={12} sm={3}>
              <img src={require('../../assets/Clipboard.gif')} width={'100%'} />
            </Grid>
          </Grow>
        </Hidden>
        <Grow in={true} timeout={3500}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paperSection} elevation={5}>
              <FieldsOfSpecialization />
            </Paper>
          </Grid>
        </Grow>
        <Grow in={true} timeout={4500}>
          <Grid
            container
            xs={10}
            md={2}
            className={classes.sideHintContainer}
            alignContent='space-between'>
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
            <Hidden smDown>
              <Grow in={true} timeout={6500}>
                <Grid item className={classes.paddingZero}>
                  <img
                    src={require('../../assets/hello.png')}
                    alt='hello'
                    style={{ height: 'auto', width: '100%' }}
                  />
                </Grid>
              </Grow>
            </Hidden>
          </Grid>
        </Grow>
      </Grid>
    </Grid>
  );
};

export default StepTwo;
