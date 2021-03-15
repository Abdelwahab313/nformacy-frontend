import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../../../styles/userTypeSelection';
import { Box, Button } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import { RoutesPaths } from 'constants/routesPath';
import { Redirect, useHistory } from 'react-router';
import { addUserRole } from 'apis/userAPI';
import { useAuth } from 'pages/auth/context/auth';
import { updateUser } from 'pages/auth/context/authActions';
import { useSnackBar } from 'context/SnackBarContext';
import clsx from 'clsx';
import authManager from 'services/authManager';

const UserTypeSelection = () => {
  const classes = useStyles();
  const history = useHistory();
  const [, dispatch] = useAuth();
  const { showErrorMessage } = useSnackBar();

  if (!!authManager.getUserRole()) {
    return <Redirect to={RoutesPaths.App.FreelancerProfile} />;
  }
  const onTypeClick = (role) => {
    addUserRole(role)
      .then((response) => {
        updateUser(dispatch, response.data);
        history.push(RoutesPaths.App.FreelancerProfile);
      })
      .catch((reason) => {
        if (reason.response) {
          showErrorMessage(reason.response.errors);
          history.push(RoutesPaths.App.FreelancerProfile);
        }
      });
  };

  return (
    <Grid
      id='userTypeSelection'
      container
      direction='row'
      justify='center'
      alignItems='center'
      className={clsx(classes.usersTypeContainer)}>

      <Grid item xs={12} sm={5} lg={3} className={classes.centerCard}>
        <img
          src={require('../../../assets/corporate.png')}
          className={classes.userImg}
        />
        <Button
          id={'corporateType'}
          onClick={() => onTypeClick('corporate')}
          className={[classes.usersTypeContainerBorder, classes.corporateTypeContainerBorder]}>
          <Box textAlign={'center'}>
            <Box
              className={classes.capitalizeText}
              borderColor='#0DA1A1'
              color='#0DA1A1'>
              <CustomTypography variant='h6' fontWeight='bold'>
                I am a Corporate
              </CustomTypography>
            </Box>
          </Box>
        </Button>
      </Grid>

      <Grid item xs={12} sm={5} lg={3} className={classes.centerCard}>
        <img
          src={require('../../../assets/client.png')}
          className={classes.userImg}
        />
        <Button
          id={'clientType'}
          onClick={() => onTypeClick('client')}
          className={[classes.usersTypeContainerBorder, classes.clientTypeContainerBorder]}>
          <Box textAlign={'center'}>
            <Box
              className={classes.capitalizeText}
              borderColor='primary.main'
              color='primary.main'>
              <CustomTypography variant='h6' fontWeight='bold'>
                I am an Individual Client
              </CustomTypography>
              <CustomTypography>
                I want to<strong> RECEIVE </strong> Professional Services for Myself
              </CustomTypography>
            </Box>
          </Box>
        </Button>
      </Grid>

      <Grid item xs={12} sm={5} lg={3} className={[classes.centerCard, classes.mobileConsultantCard]}>
        <img
          src={require('../../../assets/consultant_2.png')}
          className={classes.userImg}
        />
        <Button
          id={'freelancerType'}
          onClick={() => onTypeClick('freelancer')}
          className={[classes.usersTypeContainerBorder, classes.consultantTypeContainerBorder]}>
          <Box textAlign={'center'}>
            <Box
              className={classes.capitalizeText}
              borderColor='#bc5003'
              color='#bc5003'>
              <CustomTypography variant='h6' fontWeight='bold'>
                I am a Consultant
              </CustomTypography>
              <CustomTypography>
                I want to<strong> PROVIDE </strong> Professional Services
              </CustomTypography>
            </Box>
          </Box>
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserTypeSelection;
