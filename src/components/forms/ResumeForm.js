import WorkExperience from './WorkExperience';
import Education from './Education';
import Certification from './Certification';
import Button from '@material-ui/core/Button';
import { FormContext, useFieldArray, useForm } from 'react-hook-form';
import React, { useRef, useState } from 'react';
import { useStyles } from '../../styles/formsStyles';
import { updateProfile } from '../../apis/userAPI';


const ResumeForm = () => {

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
  const [deletedExperiences, setDeletedExperiences] = useState([]);
  const [deletedEducations, setDeletedEducations] = useState([]);
  const [deletedCertification, setDeletedCertifications] = useState([]);
  const classes = useStyles();

  const onSubmitResume = (userData) => {
    const userToBeSubmitted = {
      ...userData,
      id: user.current.id,
      experiences: !!userData.experiences
        ? [...userData.experiences, ...deletedExperiences]
        : deletedExperiences,
      educations: !!userData.educations
        ? [...userData.educations, ...deletedEducations]
        : deletedEducations,
      certifications: !!userData.certifications
        ? [...userData.certifications, ...deletedCertification]
        : deletedCertification,
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
      setDeletedExperiences={setDeletedExperiences}
      setDeletedEducations={setDeletedEducations}
      setDeletedCertifications={setDeletedCertifications}
      watch={watch}>
      <form
        id='editProfileForm'
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(onSubmitResume)}>
        <WorkExperience/>
        <Education/>
        <Certification/>
        <Button
          id='saveResume'
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

export default ResumeForm;