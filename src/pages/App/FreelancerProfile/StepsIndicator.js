import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import PersonIcon from '@material-ui/icons/Person';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SettingsIcon from '@material-ui/icons/Settings';
import StepConnector from '@material-ui/core/StepConnector';
import { lightGrey, lighterGrey, darkBlue } from 'styles/colors';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundColor: darkBlue,
    },
  },
  completed: {
    '& $line': {
      backgroundColor: darkBlue,
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: lighterGrey,
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: lightGrey,
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: darkBlue,
    boxShadow: '0 8px 20px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundColor: darkBlue,
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PersonIcon />,
    2: <SettingsIcon />,
    3: <BusinessCenterIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}>
      {icons[String(props.icon)]}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps(t) {
  if (authManager.isClient()) {
    return [t('personalInfo'), t('workInformation')];
  } else {
    return [t('personalInfo'), t('specializationAndPreferences'), t('resume')];
  }
}

const StepsIndicator = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const steps = getSteps(t);
  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={props.activeStep}
        connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default StepsIndicator;
