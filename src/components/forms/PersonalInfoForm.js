import PersonalInfo from './PersonalInfo';
import Button from '@material-ui/core/Button';
import { FormContext, useForm } from 'react-hook-form';
import React, { useRef } from 'react';
import { useStyles } from '../../styles/formsStyles';
import { updateProfile } from '../../apis/userAPI';


const PersonalInfoForm = () => {

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
  const classes = useStyles();

  const onSubmitPersonalInfo = (userData) => {
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
  };

  return (
    <FormContext
      control={control}
      register={register}
      user={user}
      errors={errors}
      setValue={setValue}
      getValues={getValues}
      watch={watch}>
      <form
        id='personalInfoForm'
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(onSubmitPersonalInfo)}>
        <PersonalInfo/>
        <Button
          id='savePersonalInfo'
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

export default PersonalInfoForm;