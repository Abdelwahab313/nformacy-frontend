import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import WorkIcon from '@material-ui/icons/Work';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PersonIcon from '@material-ui/icons/Person';
import StarIcon from '@material-ui/icons/Star';
import CustomTypography from 'components/typography/Typography';
import useHomePageStyles from '../styles/HomePageStyles';
import authManager from 'services/authManager';
import { getConsultantLevel } from 'core/user';
import { RoutesPaths } from 'constants/routesPath';
import { history } from 'services/navigation';

const USER_STEPS = [
  {
    label: 'Register',
    icon: <PersonIcon fontSize='small' />,
  },
  {
    label: 'Fill basic Information',
    icon: <VerifiedUserIcon fontSize='small' />,
  },
  {
    label: 'Fill full profile data',
    icon: <WorkIcon fontSize='small' />,
  },
  {
    label: 'Meet the Consultant Manager',
    icon: <SupervisorAccountIcon fontSize='small' />,
  },
  {
    label: 'Level 1',
    icon: <StarIcon fontSize='large' />,
  },
  {
    label: 'Level 2',
    icon: <StarIcon fontSize='large' />,
  },
  {
    label: 'Level 3',
    icon: <StarIcon fontSize='large' />,
  },
];

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 30,
    height: 30,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

const ColorlibStepIcon = ({ active, completed, icon }) => {
  const classes = useColorlibStepIconStyles();
  const userStep = USER_STEPS[icon - 1];

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}>
      {userStep.icon}
    </div>
  );
};

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const UserLevelCard = () => {
  const homePageClasses = useHomePageStyles();
  const classes = useStyles();
  const currentUser = authManager.retrieveCurrentUser();

  const activeStep = getConsultantLevel(currentUser);

  return (
    <Box
      className={[
        homePageClasses.askQuestionBox,
        homePageClasses.marginBottom,
        homePageClasses.displayDesktop,
      ]}>
      <Grid
        container
        direction='column'
        alignItems='center'
        justify='space-evenly'
        className={homePageClasses.userLevelContainer}>
        <div className={classes.root}>
          <Stepper
            className={classes.stepper}
            activeStep={activeStep}
            orientation='vertical'>
            {USER_STEPS.map((userStep) => (
              <Step key={userStep.label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  <CustomTypography variant={'body1'}>
                    {userStep.label}
                  </CustomTypography>
                </StepLabel>
                <StepContent>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => { history.push(RoutesPaths.App.FreelancerProfilePartII); }}
                        className={classes.button}>
                        {'You are here'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </div>
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  stepper: {
    backgroundColor: 'transparent',
    flexDirection: 'column-reverse',
    height: 290,
    overflow: 'auto',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
}));

export default UserLevelCard;
