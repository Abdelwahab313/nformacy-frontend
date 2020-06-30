import React, { useState } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import StepOne from './StepOne';
import StepsIndicator from './StepsIndicator';
import {
  formStyle,
  nextButtonStyles,
  stepIndicatorStyles,
  useStyles,
} from '../styles/formsStyles';
import { Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const FreeLancerProfileForm = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { register, errors, control } = useForm({
    mode: 'onChange',
    defaultValues: { ...user },
  });
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  function proceedToNextStep() {
    setActiveStep(activeStep + 1);
  }

  return (
    <div className={classes.freelancerProfileContainer}>
      <div style={stepIndicatorStyles.container}>
        <StepsIndicator activeStep={activeStep} />
      </div>
      <form id='multiStepForm' style={formStyle} noValidate>
        <FormContext
          errors={errors}
          register={register}
          control={control}
          user={user}>
          <StepOne />
        </FormContext>
        <Button
          onClick={proceedToNextStep}
          variant='contained'
          color='primary'
          style={nextButtonStyles}
          endIcon={<ArrowForwardIosIcon />}>
          Next
        </Button>
      </form>
    </div>
  );
};

export default FreeLancerProfileForm;
