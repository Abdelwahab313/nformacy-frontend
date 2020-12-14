import React from 'react';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import { useStyles } from '../../../styles/userTypeSelection';
import { Box } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';

const UserTypeSelection = () => {
  const classes = useStyles();
  return (
    <Grid
      id='userTypeSelection'
      container
      direction='row'
      justify='center'
      alignItems='center'
      className={classes.usersTypeContainer}
      spacing={5}>
      <Grow in={true} timeout={3500}>
        <Grid item xs={12} sm={5} lg={3}>
          <Box textAlign={'center'}>
            <img
              src={require('../../../assets/client.png')}
              className={classes.userImg}
            />
            <Box
              className={classes.userTypeDesc}
              borderColor='primary.main'
              color='primary.main'>
              <CustomTypography variant='h6' fontWeight='bold'>
                I am a Client
              </CustomTypography>
              <CustomTypography>
                I want to<strong> Receive</strong> Professional Services
              </CustomTypography>
            </Box>
          </Box>
        </Grid>
      </Grow>
      <Grow in={true} timeout={3500}>
        <Grid item xs={12} sm={5} lg={3}>
          <Box textAlign={'center'}>
            <img
              src={require('../../../assets/consultant_2.png')}
              className={classes.userImg}
            />
            <Box
              className={classes.userTypeDesc}
              borderColor='#bc5003'
              color='#bc5003'>
              <CustomTypography variant='h6' fontWeight='bold'>
                I am a Consultant
              </CustomTypography>
              <CustomTypography>
                I want to<strong> provide </strong> Professional Services
              </CustomTypography>
            </Box>
          </Box>
        </Grid>
      </Grow>
    </Grid>
  );
};

export default UserTypeSelection;
