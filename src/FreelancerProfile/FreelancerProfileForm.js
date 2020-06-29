import React from 'react';
import Container from '@material-ui/core/Container';
import { FormContext, useForm } from 'react-hook-form';
import StepOne from './StepOne';

const FreeLancerProfileForm = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { register, errors, control } = useForm({
    defaultValues: { ...user },
  });

  return (
    <Container component='main' maxWidth={false}>
      <Container id='stepsPercentage'></Container>
      <form id='multiStepForm' noValidate>
        <FormContext
          errors={errors}
          register={register}
          control={control}
          user={user}>
          <StepOne />
        </FormContext>
      </form>
    </Container>
  );
};

export default FreeLancerProfileForm;
