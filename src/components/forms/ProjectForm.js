import Button from '@material-ui/core/Button';
import { FormContext, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { saveButtonStyle, useStyles } from '../../styles/formsStyles';
import { updateProfile } from '../../apis/userAPI';
import { updateUser } from '../../pages/auth/context/authActions';
import { useAuth } from '../../pages/auth/context/auth';
import ProjectDialog from './ProjectDialog';

const ProjectForm = ({ user, closeDialog }) => {
  const formMethods = useForm({
    defaultValues: { ...user.current },
  });
  const [, dispatch] = useAuth();
  const [deletedProjects, setDeletedProjects] = useState([]);
  const classes = useStyles();

  const onSubmitResume = (userData) => {
    const userToBeSubmitted = {
      ...userData,
      id: user.current.id,
      projects: !!userData.projects
        ? [...userData.projects, ...deletedProjects]
        : deletedProjects,
    };
    updateProfile(userToBeSubmitted, user.current.id)
      .then((response) => {
        updateUser(dispatch, response.data);
      })
      .catch(() => {
      });
    user.current = {
      ...user.current,
      projects: [],
      ...userData,
    };
    closeDialog();
  };

  return (
    <FormContext
      user={user}
      {...formMethods}
      setDeletedProjects={setDeletedProjects}>
      <form
        id='editProfileForm'
        className={classes.nestedForm}
        noValidate
        onSubmit={formMethods.handleSubmit(onSubmitResume)}>
        <ProjectDialog />
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

export default ProjectForm;
