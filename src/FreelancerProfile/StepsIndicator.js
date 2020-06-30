import React from 'react';
import StepConnector from '@material-ui/core/StepConnector';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Step from '@material-ui/core/Step';
import clsx from 'clsx';
import { Check } from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { lighterPink, pink } from '../styles/colors';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
    color: pink,
  },
  active: {
    '& $line': {
      borderColor: pink,
    },
  },
  completed: {
    '& $line': {
      borderColor: pink,
    },
  },
  line: {
    borderColor: lighterPink,
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

const useQontoStepIconStyles = makeStyles({
  root: {
    color: lighterPink,
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: pink,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: pink,
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}>
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

const StepsIndicator = (props) => {
  const steps = getSteps();
  return (
    <Grid>
      <Stepper
        alternativeLabel
        activeStep={props.activeStep}
        connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Grid>
  );
};

export default StepsIndicator;
