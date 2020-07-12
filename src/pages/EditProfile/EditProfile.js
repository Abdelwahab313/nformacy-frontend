import React, { useRef, useState } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FormContext, useFieldArray, useForm } from 'react-hook-form';
import { useStyles } from '../../styles/formsStyles';
import { withNamespaces } from 'react-i18next';
import ReactTooltip from 'react-tooltip';
import { updateProfile, updateProfilePicture } from '../../apis/userAPI';
import FieldsOfSpecialization from '../../components/forms/FieldsOfSpecialization';
import PersonalInfo from '../../components/forms/PersonalInfo';
import WorkExperience from '../../components/forms/WorkExperience';
import Education from '../../components/forms/Education';
import Certification from '../../components/forms/Certification';
import BasicInfo from '../../components/forms/BasicInfo';

const EditProfile = ({ t }) => {
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
  const [deletedExperiences, setDeletedExperiences] = useState([]);
  const [deletedEducations, setDeletedEducations] = useState([]);
  const [deletedCertification, setDeletedCertifications] = useState([]);
  const certificationForm = useFieldArray({
    control,
    name: 'certifications',
  });
  const classes = useStyles();

  const onSubmit = (userData) => {
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
      .catch((error) => {});

    if (avatar.length > 0) {
      const file = new Blob(avatar);
      const formData = new FormData();
      formData.append('avatar', file, avatar[0].name);

      updateProfilePicture(formData, user.current.id)
        .then((response) => {
          localStorage.setItem('user', JSON.stringify(response.data));
        })
        .catch((error) => {});
    }
  };

  return (
    <Container component='main' maxWidth={false} dir='ltr'>
      <ReactTooltip globalEventOff={'click'} />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t('Edit Profile')}
        </Typography>
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
            id='editProfileForm'
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}>
            <BasicInfo />
            <PersonalInfo />
            <FieldsOfSpecialization />
            <WorkExperience />
            <Education />
            <Certification />
            <Container maxWidth={false} className={classes.formControl} />
            <Button
              id='save'
              type='submit'
              variant='contained'
              color='primary'
              className={[classes.editButton, classes.submit]}>
              {t('Save')}
            </Button>
          </form>
        </FormContext>
      </div>
    </Container>
  );
};
export default withNamespaces('editProfile')(EditProfile);
