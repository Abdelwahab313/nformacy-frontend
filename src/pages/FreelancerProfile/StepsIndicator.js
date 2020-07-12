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
import { lighterPink, lightPink, pink } from '../../styles/colors';
import t from '../../locales/en/freelancerProfile.json';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundColor: pink,
    },
  },
  completed: {
    '& $line': {
      backgroundColor: pink,
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: lighterPink,
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: lightPink,
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
    backgroundColor: pink,
    boxShadow: '0 8px 20px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundColor: pink,
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

function getSteps() {
  return [t['personalInfo'], t['specializationAndPreferences'], t['resume']];
}

const StepsIndicator = (props) => {
  const classes = useStyles();
  const steps = getSteps();
  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={props.activeStep}
        connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon} style={{color: 'red'}}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default StepsIndicator;
