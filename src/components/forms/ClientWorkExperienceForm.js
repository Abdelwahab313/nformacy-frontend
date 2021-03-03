import ClientWorkExperience from './ClientWorkExperience';
import Button from '@material-ui/core/Button';
import { FormContext, useForm } from 'react-hook-form';
import React from 'react';
import { saveButtonStyle, useStyles } from '../../styles/formsStyles';
import { updateProfile } from '../../apis/userAPI';
import { updateUser } from '../../pages/auth/context/authActions';
import { useAuth } from '../../pages/auth/context/auth';
import { FormControl, Container, TextField } from '@material-ui/core';
import t from '../../locales/en/freelancerProfile.json';

const ClientWorkExperienceForm = ({ user, closeDialog }) => {
  const formMethods = useForm({
    defaultValues: { ...user.current },
  });
  const [_, dispatch] = useAuth();
  const classes = useStyles();

  const onSubmitResume = (userData) => {
    const userToBeSubmitted = {
      ...userData,
      id: user.current.id,
    };
    updateProfile(userToBeSubmitted, user.current.id)
      .then((response) => {
        updateUser(dispatch, response.data);
      })
      .catch(() => {
      });
    user.current = {
      ...user.current,
      ...userData,
    };
    closeDialog();
  };

  return (
    <FormContext
      user={user}
      {...formMethods}>
      <form
        id='editProfileForm'
        className={classes.nestedForm}
        noValidate
        onSubmit={formMethods.handleSubmit(onSubmitResume)}>
        <ClientWorkExperience />
        <Container maxWidth={false} className={classes.formControl}>
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              variant='outlined'
              margin='normal'
              label={t['jobTitle']}
              fullWidth
              id='jobTitleField'
              name='jobTitle'
              inputRef={formMethods.register()}
              autoComplete='jobtitle'
              defaultValue={!user.current.jobTitle && ''}
            />
            <TextField
              variant='outlined'
              margin='normal'
              label={t['company']}
              fullWidth
              id='organizationName'
              name='organizationName'
              inputRef={formMethods.register()}
              defaultValue={!user.current.organizationName && ''}
              autoComplete='organizationName'
            />
          </FormControl>
        </Container>
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

export default ClientWorkExperienceForm;
