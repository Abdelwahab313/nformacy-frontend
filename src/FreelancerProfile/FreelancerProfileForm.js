import React, { useState, useCallback, useRef } from 'react';
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
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const {
    register,
    errors,
    control,
    getValues,
    setValue,
    watch,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: { ...user.current },
  });
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const stepsFields = [
    ['gender', 'country', 'mobileNumber', 'currentEmploymentStatus'],
    [
      'industriesOfExperience',
      'majorFieldsOfExperience',
      'specificFieldsOfExperience',
      'languageOfAssignments',
      'typesOfAssignments',
      'locationOfAssignments',
    ],
  ];

  const stepValid = useCallback(() => {
    const hasAnyInvalidField = Object.keys(errors).some((error) =>
      stepsFields[activeStep].includes(error),
    );
    return hasAnyInvalidField;
  }, [errors, activeStep]);

  function proceedToNextStep() {
    if (activeStep < 2) {
      user.current = { ...user.current, ...getValues(stepsFields[activeStep]) };
      setActiveStep(activeStep + 1);
    }
  }

  function getBackToPreviousStep() {
    if (activeStep > 0) {
      reset(user.current);
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
        <Grid
          item
          xs={12}
          md={10}
          style={
            activeStep === 0
              ? { ...navigationButtonsContainer, justifyContent: 'flex-end' }
              : navigationButtonsContainer
          }>
          {activeStep !== 0 && (
            <Button
              onClick={getBackToPreviousStep}
              variant='contained'
              startIcon={<ArrowBackIosIcon />}>
              back
            </Button>
          )}
          <Button
            id='nextButton'
            disabled={stepValid()}
            onClick={proceedToNextStep}
            variant='contained'
            style={nextButtonStyles(stepValid())}
            endIcon={<ArrowForwardIosIcon />}>
            Next
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default FreeLancerProfileForm;
