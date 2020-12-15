import React from 'react';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import { useStyles } from '../../../styles/userTypeSelection';
import { Box } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import { RoutesPaths } from 'constants/routesPath';
import LinkText from 'components/typography/LinkText';
import { useHistory } from 'react-router';
import { addUserRole } from '../../../apis/userAPI';
import { useAuth } from 'pages/auth/context/auth';
import { updateUser } from 'pages/auth/context/authActions';

const UserTypeSelection = () => {
  const classes = useStyles();
  const history = useHistory();
  const [, dispatch] = useAuth();

  const onTypeClick = (role) => {
    addUserRole(role).then((response) => {
      updateUser(dispatch, response.data);
      history.push(RoutesPaths.App.FreelancerProfile);
    });
  };

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
          <LinkText onClick={() => onTypeClick('client')}>
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
          </LinkText>
        </Grid>
      </Grow>

      <Grow in={true} timeout={3500}>
        <Grid item xs={12} sm={5} lg={3}>
          <LinkText onClick={() => onTypeClick('freelancer')}>
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
          </LinkText>
        </Grid>
      </Grow>
    </Grid>
  );
};

export default UserTypeSelection;
