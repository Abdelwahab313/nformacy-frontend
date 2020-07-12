import React, { useRef, useState } from 'react';
import BasicInfo from './BasicInfo';
import Button from '@material-ui/core/Button';
import { FormContext, useForm } from 'react-hook-form';
import { updateProfile, updateProfilePicture } from '../../apis/userAPI';
import { useStyles } from '../../styles/formsStyles';

const BasicInfoForm = () => {

  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const {
    register,
    watch,
    setValue,
    getValues,
    control,
    errors,
    handleSubmit,
  } = useForm({
    defaultValues: { ...user.current },
  });
  const [avatar, setAvatar] = useState([]);
  const classes = useStyles();

  const onSubmitBasicInfo = (userData) => {
    const userToBeSubmitted = {
      ...userData,
      id: user.current.id,
    };
    updateProfile(userToBeSubmitted, user.current.id)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
      })
      .catch((error) => {
      });
    if (avatar.length > 0) {
      const file = new Blob(avatar);
      const formData = new FormData();
      formData.append('avatar', file, avatar[0].name);

      updateProfilePicture(formData, user.current.id)
        .then((response) => {
          localStorage.setItem('user', JSON.stringify(response.data));
        })
        .catch((error) => {
        });
    }
  };

  return (
    <FormContext
      control={control}
      register={register}
      user={user}
      errors={errors}
      setValue={setValue}
      getValues={getValues}
      setAvatar={setAvatar}
      watch={watch}>
      <form
        id='editBasicInfoForm'
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(onSubmitBasicInfo)}>
        <BasicInfo/>
        <Button
          id='saveBasicInfo'
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

export default BasicInfoForm;