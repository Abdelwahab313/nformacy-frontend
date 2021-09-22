import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { FormContext, useForm } from 'react-hook-form';
import { saveButtonStyle, useStyles } from 'styles/formsStyles';
import { updateProfile, updateProfilePicture } from 'apis/userAPI';
import BeneficiaryBasicInfo from './BeneficiaryBasicInfo';

const BeneficiaryProfileDetailsForm = ({
  client,
  closeDialog,
  setProfilePic,
  setClient,
}) => {
  const formMethod = useForm({
    defaultValues: { ...client },
  });
  const [avatar, setAvatar] = useState([]);

  const classes = useStyles();

  const onSubmitBasicInfo = (userData) => {
    const userToBeSubmitted = {
      ...userData,
      id: client.id,
    };
    updateProfile(userToBeSubmitted, client.id).then((response) => {
      setClient(response.data);
    });
    if (avatar.length > 0) {
      const file = new Blob(avatar);
      const formData = new FormData();
      formData.append('avatar', file, avatar[0].name);

      updateProfilePicture(formData, client.id).then((response) => {
        setClient(response.data);
        if (response.data.avatar) {
          setProfilePic(response.data.avatar);
        }
      });
    }
    client = { ...client, ...userData };
    closeDialog();
  };

  return (
    <FormContext client={client} setAvatar={setAvatar} {...formMethod}>
      <form
        id='editBasicInfoForm'
        className={classes.nestedForm}
        noValidate
        onSubmit={formMethod.handleSubmit(onSubmitBasicInfo)}>
        <BeneficiaryBasicInfo client={client} />
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

export default BeneficiaryProfileDetailsForm;
