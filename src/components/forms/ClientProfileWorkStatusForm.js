import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { FormContext, useForm } from 'react-hook-form';
import { updateProfile, updateProfilePicture } from '../../apis/userAPI';
import { saveButtonStyle, useStyles } from '../../styles/formsStyles';
import { updateUser } from '../../pages/auth/context/authActions';
import { useAuth } from '../../pages/auth/context/auth';
import ClientWorkStatusDialog from './ClientWorkStatusDialog';
import { TextField, Container, FormControl } from '@material-ui/core';
import t from '../../locales/en/freelancerProfile.json';
import FieldsOfExperience from './FieldsOfExpereience';

const ClientProfileWorkStatusForm = ({ user, closeDialog }) => {
  const formMethod = useForm({
    defaultValues: { ...user.current },
  });
  const [avatar, setAvatar] = useState([]);
  const [, dispatch] = useAuth();

  const classes = useStyles();
  const onSubmitBasicInfo = (userData) => {
    const userToBeSubmitted = {
      ...userData,
      id: user.current.id,
    };
    updateProfile(userToBeSubmitted, user.current.id)
      .then((response) => {
        updateUser(dispatch, response.data);
      });
    if (avatar.length > 0) {
      const file = new Blob(avatar);
      const formData = new FormData();
      formData.append('avatar', file, avatar[0].name);

      updateProfilePicture(formData, user.current.id)
        .then((response) => {
          updateUser(dispatch, response.data);
        });
    }
    user.current = { ...user.current, ...userData };
    closeDialog();
  };
  return (
    <FormContext user={user} setAvatar={setAvatar} {...formMethod}>
      <form
        id='editBasicInfoForm'
        className={classes.nestedForm}
        noValidate
        onSubmit={formMethod.handleSubmit(onSubmitBasicInfo)}>
        <ClientWorkStatusDialog />
        <Container maxWidth={false} className={classes.formControl}>
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              variant='outlined'
              margin='normal'
              label={t['jobTitle']}
              fullWidth
              id='jobTitleField'
              name='jobTitle'
              inputRef={formMethod.register()}
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
              inputRef={formMethod.register()}
              defaultValue={!user.current.organizationName && ''}
              autoComplete='organizationName'
            />
          </FormControl>
        </Container>
        <FieldsOfExperience />
        <Button
          id='saveBasicInfo'
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

export default ClientProfileWorkStatusForm;
