import React from 'react';
import { FormContext, useForm } from 'react-hook-form';
import StepOne from './StepOne';
import StepsIndicator from './StepsIndicator';
import { useStyles } from '../styles/formsStyles';

const FreeLancerProfileForm = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { register, errors, control } = useForm({
    mode: 'onChange',
    defaultValues: { ...user },
  });
  const classes = useStyles();

  return (
    <div className={classes.freelancerProfileContainer}>
      <StepsIndicator />
      <form id='multiStepForm' noValidate>
        <FormContext
          errors={errors}
          register={register}
          control={control}
          user={user}>
          <StepOne />
        </FormContext>
      </form>
    </div>
  );
};

export default FreeLancerProfileForm;
