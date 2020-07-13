import FieldsOfSpecialization from './FieldsOfSpecialization';
import Button from '@material-ui/core/Button';
import { FormContext, useForm } from 'react-hook-form';
import React, { useRef } from 'react';
import { useStyles } from '../../styles/formsStyles';
import { updateProfile } from '../../apis/userAPI';

const FieldsOfSpecializationForm = ({ user, closeDialog }) => {
  const formMethods = useForm({
    defaultValues: { ...user.current },
  });
  const classes = useStyles();

  const onSubmitFieldsOfSpecialization = (userData) => {
    const userToBeSubmitted = {
      ...userData,
      id: user.current.id,
    };
    updateProfile(userToBeSubmitted, user.current.id)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
      })
      .catch((error) => {});
    user.current = { ...user.current, ...userData };
    closeDialog();
  };

  return (
    <FormContext user={user} {...formMethods}>
      <form
        id='editProfileForm'
        className={classes.nestedForm}
        noValidate
        onSubmit={formMethods.handleSubmit(onSubmitFieldsOfSpecialization)}>
        <FieldsOfSpecialization />
        <Button
          id='saveFieldsOfSpecialization'
          type='submit'
          variant='contained'
          color='primary'
          className={[classes.editButton, classes.submit]}>
          Save
        </Button>
      </form>
    </FormContext>
  );
};

export default FieldsOfSpecializationForm;
