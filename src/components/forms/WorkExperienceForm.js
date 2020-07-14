import WorkExperience from './WorkExperience';
import Button from '@material-ui/core/Button';
import { FormContext, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { saveButtonStyle, useStyles } from '../../styles/formsStyles';
import { updateProfile } from '../../apis/userAPI';

const WorkExperienceForm = ({ user, closeDialog }) => {
  const formMethods = useForm({
    defaultValues: { ...user.current },
  });
  const [deletedExperiences, setDeletedExperiences] = useState([]);
  const classes = useStyles();

  const onSubmitResume = (userData) => {
    const userToBeSubmitted = {
      ...userData,
      id: user.current.id,
      experiences: !!userData.experiences
        ? [...userData.experiences, ...deletedExperiences]
        : deletedExperiences,
    };
    updateProfile(userToBeSubmitted, user.current.id)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
      })
      .catch((error) => {
      });
    user.current = {
      ...user.current,
      experiences: [],
      ...userData,
    };
    closeDialog();
  };

  return (
    <FormContext
      user={user}
      {...formMethods}
      setDeletedExperiences={setDeletedExperiences}>
      <form
        id='editProfileForm'
        className={classes.nestedForm}
        noValidate
        onSubmit={formMethods.handleSubmit(onSubmitResume)}>
        <WorkExperience/>
        <Button
          id='saveResume'
          type='submit'
          variant='contained'
          color='primary'
          style={saveButtonStyle()}>
          Save
        </Button>
      </form>
    </FormContext>
  );
};

export default WorkExperienceForm;
