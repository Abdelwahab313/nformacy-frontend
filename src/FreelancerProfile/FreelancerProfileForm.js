import React, { useState } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import StepOne from './StepOne';
import StepsIndicator from './StepsIndicator';
import {
  formStyle,
  navigationButtonsContainer,
  nextButtonStyles,
  stepIndicatorStyles,
  useStyles,
} from '../styles/formsStyles';
import { Button } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const FreeLancerProfileForm = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { register, errors, control, getValues, setValue, watch } = useForm({
    mode: 'onChange',
    defaultValues: { ...user },
  });
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  function proceedToNextStep() {
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    }
  }

  function getBackToPreviousStep() {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
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
          user={user}
          getValues={getValues}
          setValue={setValue}
          watch={watch}>
          {activeStep === 0 && <StepOne />}
          {activeStep === 1 && <StepTwo />}
          {activeStep === 2 && <StepThree />}
        </FormContext>
        <Grid item xs={12} md={10} style={navigationButtonsContainer}>
          <Button
            onClick={getBackToPreviousStep}
            variant='contained'
            startIcon={<ArrowBackIosIcon />}>
            back
          </Button>
          <Button
            id='nextButton'
            onClick={proceedToNextStep}
            variant='contained'
            style={nextButtonStyles}
            endIcon={<ArrowForwardIosIcon />}>
            Next
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default FreeLancerProfileForm;
