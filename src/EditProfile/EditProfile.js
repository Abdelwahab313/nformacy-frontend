import React, { useRef, useState } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { FormContext, useFieldArray, useForm } from 'react-hook-form';
import { useStyles } from '../styles/formsStyles';
import { withNamespaces } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ImageUploader from 'react-images-upload';
import ReactTooltip from 'react-tooltip';
import { updateProfile, updateProfilePicture } from '../apis/userAPI';
import FieldsOfSpecialization from '../components/forms/FieldsOfSpecialization';
import ErrorMessage from '../components/errors/ErrorMessage';
import PersonalInfo from '../components/forms/PersonalInfo';
import AssignmentPreferences from '../components/forms/AssignmentPreferences';
import WorkExperience from '../components/forms/WorkExperience';
import Education from '../components/forms/Education';
import Certification from '../components/forms/Certification';

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

  const uploadPhoto = (picture) => {
    setAvatar(picture);
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
          watch={watch}>
          <form
            id='editProfileForm'
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}>
            <Paper className={classes.paperSection} elevation={5}>
              <Container>
                <Grid container alignItems='center'>
                  <Grid item xs>
                    <Typography gutterBottom variant='h4'>
                      Basic Info
                    </Typography>
                  </Grid>
                </Grid>
                <Divider variant='middle' />
                <Container maxWidth={false} className={classes.formControl}>
                  <Typography gutterBottom variant='subtitle2'>
                    Profile Picture
                  </Typography>
                  <ImageUploader
                    withPreview={true}
                    singleImage={true}
                    label={'Max file size: 1mb, accepted: jpg, gif, png'}
                    withIcon={true}
                    buttonText='Choose images'
                    imgExtension={['.jpg', '.gif', '.png', 'jpeg']}
                    maxFileSize={1048576}
                    onChange={uploadPhoto}
                  />
                </Container>
                <Container maxWidth={false} className={classes.formControl}>
                  <Typography gutterBottom variant='subtitle2'>
                    First Name
                  </Typography>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='firstName'
                    name='firstName'
                    defaultValue={!user.current.firstName && ''}
                    inputRef={register({ required: 'This field is required' })}
                    autoComplete='name'
                    error={!!errors.firstName}
                  />
                  <ErrorMessage errorField={errors.firstName} />
                </Container>
                <Container maxWidth={false} className={classes.formControl}>
                  <Typography gutterBottom variant='subtitle2'>
                    Last Name
                  </Typography>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='lastName'
                    name='lastName'
                    defaultValue={!user.current.lastName && ''}
                    inputRef={register({ required: 'This field is required' })}
                    autoComplete='name'
                    error={!!errors.lastName}
                  />
                  <ErrorMessage errorField={errors.lastName} />
                </Container>
                <Container maxWidth={false} className={classes.formControl}>
                  <Typography gutterBottom variant='subtitle2'>
                    Email
                  </Typography>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    inputRef={register({
                      required: 'This field is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'invalid email address',
                      },
                    })}
                    fullWidth
                    id='email'
                    name='email'
                    defaultValue={!user.current.email && ''}
                    autoComplete='email'
                    error={!!errors.email}
                  />
                  <ErrorMessage errorField={errors.email} />
                </Container>
              </Container>
            </Paper>
            <PersonalInfo />
            <FieldsOfSpecialization />
            <AssignmentPreferences />
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
