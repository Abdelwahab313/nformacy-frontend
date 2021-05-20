import { FormContext, useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import { saveButtonStyle, useStyles } from '../../styles/formsStyles';
import React, { useState } from 'react';
import CV from './CV';
import { updateProfile, uploadCV } from '../../apis/userAPI';
import { useAuth } from '../../pages/auth/context/auth';
import { updateUser } from '../../pages/auth/context/authActions';
import { Typography } from '@material-ui/core';

const CVForm = ({ user, setCVLink, closeDialog }) => {
  const classes = useStyles();
  const [, dispatch] = useAuth();
  const [cv, setCV] = useState();
  const cvLink = user?.current?.cv;
  const cvFileName = cvLink?.split('/').pop().replace('%20', ' ');

  const onSubmitCV = (userData) => {
    const userToBeSubmitted = {
      ...userData,
      id: user.current.id,
    };
    updateProfile(userToBeSubmitted, user.current.id)
      .then((response) => {
        updateUser(dispatch, response.data);
      })
      .catch(() => { });
    if (cv?.length > 0) {
      const file = new Blob(cv);
      const formData = new FormData();
      formData.append('cv', file, cv[0].name);

      uploadCV(formData, user.current.id)
        .then((response) => {
          updateUser(dispatch, response.data);
          setCVLink(response.data.cv);
        })
        .catch(() => { });
    }
    user.current = { ...user.current, ...userData };
    closeDialog();
  };
  const formMethod = useForm();

  const handleCVFileName = () => {
    if (cv?.length > 0) {
      return (<Typography gutterBottom variant='subtitle2'>
        {cv[0].name}
      </Typography>);
    }
    else if (user?.current?.cv?.indexOf('.pdf') != -1) {
      return cvFileName;
    }
  };
  
  return (
    <FormContext setCV={setCV} {...formMethod}>
      <form
        id='editCVForm'
        className={classes.nestedForm}
        noValidate
        onSubmit={formMethod.handleSubmit(onSubmitCV)}>
        <CV />
        {handleCVFileName()}
        <Button
          id='saveCV'
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
export default CVForm;
