import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {
  useFieldArray,
  useForm,
  Controller,
  FormContext,
} from 'react-hook-form';
import { useStyles } from '../styles/formsStyles';
import { withNamespaces } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ImageUploader from 'react-images-upload';
import ReactTooltip from 'react-tooltip';
import CardContent from '@material-ui/core/CardContent';
import CreatableSelect from 'react-select/creatable';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import ReactSelect from 'react-select';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  assignmentLanguage,
  assignmentLocations,
  assignmentTypes,
  employmentStatus,
  gender,
  industries,
} from '../constants/dropDownOptions';
import { updateProfile, updateProfilePicture } from '../apis/userAPI';
import HelpIcon from '@material-ui/icons/Help';
import { Input } from '@material-ui/core';
import FieldsOfSpecialization from '../components/forms/FieldsOfSpecialization';
import ErrorMessage from '../components/errors/ErrorMessage';
import PersonalInfo from '../components/forms/PersonalInfo';
import AssignmentPreferences from '../components/forms/AssignmentPreferences';
const EditProfile = ({ t }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const {
    register,
    watch,
    setValue,
    getValues,
    control,
    errors,
    handleSubmit,
  } = useForm({
    defaultValues: { ...user },
  });
  const [avatar, setAvatar] = useState([]);
  const watchExperiences = watch('experiences');
  const [deletedExperiences, setDeletedExperiences] = useState([]);
  const [deletedEducations, setDeletedEducations] = useState([]);
  const [deletedCertification, setDeletedCertifications] = useState([]);
  const experienceForm = useFieldArray({
    control,
    name: 'experiences',
  });
  const educationForm = useFieldArray({
    control,
    name: 'educations',
  });
  const certificationForm = useFieldArray({
    control,
    name: 'certifications',
  });
  const classes = useStyles();

  const onSubmit = (userData) => {
    const userToBeSubmitted = {
      ...userData,
      id: user.id,
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
    updateProfile(userToBeSubmitted, user.id)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
      })
      .catch((error) => {});

    debugger;
    if (avatar.length > 0) {
      const file = new Blob(avatar);
      const formData = new FormData();
      formData.append('avatar', file, avatar[0].name);

      updateProfilePicture(formData, user.id)
        .then((response) => {
          localStorage.setItem('user', JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log('laaaaa-----', error);
        });
    }
  };

  const uploadPhoto = (picture) => {
    setAvatar(picture);
    console.log('----------------------AVATARRRR----------', avatar);
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
          getValues={getValues}>
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
                    defaultValue={!user.firstName && ''}
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
                    defaultValue={!user.lastName && ''}
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
                    defaultValue={!user.email && ''}
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
            <Paper className={classes.paperSection} elevation={5}>
              <Container className={classes.nestedContainer}>
                <Grid container alignItems='center'>
                  <Grid item xs>
                    <Typography gutterBottom variant='h4'>
                      Work experience
                    </Typography>
                  </Grid>
                </Grid>
                <Divider variant='middle' />
                <Container>
                  {experienceForm.fields.map((item, index) => (
                    <Card key={item.id} className={classes.nestedCardContainer}>
                      <ReactTooltip globalEventOff={'click'} />
                      <CardContent>
                        {!!user.experiences[index] && (
                          <Input
                            label={t('id')}
                            type='hidden'
                            name={`experiences[${index}][id]`}
                            defaultValue={item.id}
                            inputRef={register()}
                          />
                        )}
                        <Container
                          maxWidth={false}
                          className={classes.formControl}>
                          <TextField
                            fullWidth
                            label={t('JobTitle')}
                            variant='outlined'
                            name={`experiences[${index}][title]`}
                            id={`work-experience-title-${index}`}
                            defaultValue={item.title}
                            inputRef={register()}
                          />
                        </Container>
                        <Container
                          maxWidth={false}
                          className={classes.formControl}>
                          <TextField
                            fullWidth
                            label={t('Company')}
                            variant='outlined'
                            name={`experiences[${index}][company]`}
                            id={`work-experience-company-${index}`}
                            defaultValue={item.company}
                            inputRef={register()}
                          />
                        </Container>
                        <Container className={classes.datesContainer}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Container
                              maxWidth={false}
                              className={classes.formControl}>
                              <Controller
                                name={`experiences[${index}][startDate]`}
                                control={control}
                                as={
                                  <KeyboardDatePicker
                                    variant='inline'
                                    views={['year', 'month']}
                                    format='MM/yyyy'
                                    autoOk
                                    margin='normal'
                                    label='Start date'
                                    KeyboardButtonProps={{
                                      'aria-label': 'change date',
                                    }}
                                    onChange={(value) => value[0]}
                                  />
                                }
                              />
                            </Container>
                            <Container
                              maxWidth={false}
                              className={classes.formControl}>
                              {!watchExperiences[index] ||
                                (!watchExperiences[index].toDate && (
                                  <Controller
                                    name={`experiences[${index}][endDate]`}
                                    control={control}
                                    as={
                                      <KeyboardDatePicker
                                        variant='inline'
                                        views={['year', 'month']}
                                        format='MM/yyyy'
                                        autoOk
                                        margin='normal'
                                        label='end date'
                                        inputRef={register()}
                                        KeyboardButtonProps={{
                                          'aria-label': 'change date',
                                        }}
                                        onChange={(value) => value[0]}
                                      />
                                    }
                                  />
                                ))}
                            </Container>
                          </MuiPickersUtilsProvider>
                        </Container>
                        <Container
                          maxWidth={false}
                          className={classes.checkBoxControl}>
                          <FormControl
                            component='fieldset'
                            className={classes.formControl}
                            data-tip='Do you still work there?'>
                            <FormGroup>
                              <Controller
                                name={`experiences[${index}][toDate]`}
                                valueName='checked'
                                type='checkbox'
                                control={control}
                                as={
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name={`experiences[${index}][toDate]`}
                                        inputRef={register()}
                                      />
                                    }
                                    label='Present?'
                                  />
                                }
                              />
                            </FormGroup>
                          </FormControl>
                        </Container>
                        <Container
                          maxWidth={false}
                          className={classes.formControl}>
                          <Button
                            variant='contained'
                            onClick={() => {
                              if (!!item.title) {
                                item['_destroy'] = true;
                                setDeletedExperiences((prevItems) => [
                                  ...prevItems,
                                  item,
                                ]);
                              }
                              experienceForm.remove(index);
                            }}
                            color='secondary'
                            startIcon={<Icon>remove_circle</Icon>}>
                            Remove Work Experience
                          </Button>
                        </Container>
                      </CardContent>
                    </Card>
                  ))}
                  <section className={classes.formControl}>
                    <Button
                      variant='contained'
                      id='add-work-experience'
                      onClick={() => experienceForm.append({})}
                      color='primary'
                      startIcon={<Icon>add_circle</Icon>}>
                      Add Work Experience
                    </Button>
                  </section>
                </Container>
              </Container>
            </Paper>
            <Paper className={classes.paperSection} elevation={5}>
              <Container className={classes.nestedContainer}>
                <Grid container alignItems='center'>
                  <Grid item xs>
                    <Typography gutterBottom variant='h4'>
                      Education
                    </Typography>
                  </Grid>
                </Grid>
                <Divider variant='middle' />
                <Container>
                  {educationForm.fields.map((item, index) => (
                    <Card key={item.id} className={classes.nestedCardContainer}>
                      <ReactTooltip globalEventOff={'click'} />
                      <CardContent>
                        {!!user.educations[index] && (
                          <Input
                            label={t('id')}
                            type='hidden'
                            name={`educations[${index}][id]`}
                            defaultValue={item.id}
                            inputRef={register()}
                          />
                        )}
                        <Container
                          maxWidth={false}
                          className={classes.formControl}>
                          <TextField
                            fullWidth
                            label={t('University')}
                            variant='outlined'
                            name={`educations[${index}].school`}
                            id={`educations[${index}]-school`}
                            defaultValue={item.school}
                            inputRef={register()}
                          />
                        </Container>
                        <Container
                          maxWidth={false}
                          className={classes.formControl}>
                          <TextField
                            fullWidth
                            label={t('Degree')}
                            variant='outlined'
                            name={`educations[${index}].degree`}
                            id={`educations[${index}]-degree`}
                            defaultValue={item.degree}
                            inputRef={register()}
                          />
                        </Container>
                        <Container
                          maxWidth={false}
                          className={classes.formControl}>
                          <TextField
                            fullWidth
                            label={t('FieldOfStudy')}
                            variant='outlined'
                            name={`educations[${index}].fieldOfStudy`}
                            defaultValue={item.fieldOfStudy}
                            inputRef={register()}
                          />
                        </Container>
                        <Container className={classes.datesContainer}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Container
                              maxWidth={false}
                              className={classes.formControl}>
                              <Controller
                                name={`educations[${index}].endYear`}
                                control={control}
                                as={
                                  <KeyboardDatePicker
                                    variant='inline'
                                    autoOk
                                    views={['year', 'month']}
                                    format='MM/yyyy'
                                    margin='normal'
                                    label='end date'
                                    KeyboardButtonProps={{
                                      'aria-label': 'change date',
                                    }}
                                    onChange={(value) => value[0]}
                                  />
                                }
                              />
                            </Container>
                          </MuiPickersUtilsProvider>
                        </Container>
                        <Container
                          maxWidth={false}
                          className={classes.formControl}>
                          <Button
                            variant='contained'
                            onClick={() => {
                              if (!!item.school) {
                                item['_destroy'] = true;
                                setDeletedEducations((prevItems) => [
                                  ...prevItems,
                                  item,
                                ]);
                              }
                              educationForm.remove(index);
                            }}
                            color='secondary'
                            startIcon={<Icon>remove_circle</Icon>}>
                            Remove Education
                          </Button>
                        </Container>
                      </CardContent>
                    </Card>
                  ))}
                  <section className={classes.formControl}>
                    <Button
                      variant='contained'
                      id='add-education'
                      onClick={() => educationForm.append({})}
                      color='primary'
                      startIcon={<Icon>add_circle</Icon>}>
                      Add Education
                    </Button>
                  </section>
                </Container>
              </Container>
            </Paper>
            <Paper className={classes.paperSection} elevation={5}>
              <Container className={classes.nestedContainer}>
                <Grid container alignItems='center'>
                  <Grid item xs>
                    <Typography gutterBottom variant='h4'>
                      Certifications
                    </Typography>
                  </Grid>
                </Grid>
                <Divider variant='middle' />
                <Container>
                  {certificationForm.fields.map((item, index) => (
                    <Card key={item.id} className={classes.nestedCardContainer}>
                      <ReactTooltip globalEventOff={'click'} />
                      <CardContent>
                        {!!user.certifications[index] && (
                          <Input
                            label={t('id')}
                            type='hidden'
                            name={`certifications[${index}][id]`}
                            defaultValue={item.id}
                            inputRef={register()}
                          />
                        )}
                        <Container
                          maxWidth={false}
                          className={classes.formControl}>
                          <TextField
                            fullWidth
                            label={t('Name')}
                            variant='outlined'
                            name={`certifications[${index}].name`}
                            defaultValue={item.name}
                            inputRef={register()}
                          />
                        </Container>
                        <Container
                          maxWidth={false}
                          className={classes.formControl}>
                          <TextField
                            fullWidth
                            label={t('IssuingOrganization')}
                            variant='outlined'
                            name={`certifications[${index}].issuingOrganization`}
                            defaultValue={item.issuingOrganization}
                            inputRef={register()}
                          />
                        </Container>
                        <Container
                          maxWidth={false}
                          className={classes.formControl}>
                          <TextField
                            fullWidth
                            label={t('Credential')}
                            variant='outlined'
                            name={`certifications[${index}].credential`}
                            defaultValue={item.credential}
                            inputRef={register()}
                          />
                        </Container>
                        <Container
                          maxWidth={false}
                          className={classes.formControl}>
                          <TextField
                            fullWidth
                            label={t('CredentialUrl')}
                            variant='outlined'
                            name={`certifications[${index}].credentialUrl`}
                            defaultValue={item.credentialUrl}
                            inputRef={register()}
                          />
                        </Container>
                        <Container className={classes.datesContainer}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Container
                              maxWidth={false}
                              className={classes.formControl}>
                              <Controller
                                name={`certifications[${index}].startDate`}
                                control={control}
                                as={
                                  <KeyboardDatePicker
                                    variant='inline'
                                    autoOk
                                    views={['year', 'month']}
                                    format='MM/yyyy'
                                    margin='normal'
                                    label='Start date'
                                    KeyboardButtonProps={{
                                      'aria-label': 'change date',
                                    }}
                                    onChange={(value) => value[0]}
                                  />
                                }
                              />
                            </Container>
                            <Container
                              maxWidth={false}
                              className={classes.formControl}>
                              <Controller
                                name={`certifications[${index}].endDate`}
                                control={control}
                                as={
                                  <KeyboardDatePicker
                                    variant='inline'
                                    autoOk
                                    views={['year', 'month']}
                                    format='MM/yyyy'
                                    margin='normal'
                                    label='end date'
                                    KeyboardButtonProps={{
                                      'aria-label': 'change date',
                                    }}
                                    onChange={(value) => value[0]}
                                  />
                                }
                              />
                            </Container>
                          </MuiPickersUtilsProvider>
                        </Container>
                        <Container
                          maxWidth={false}
                          className={classes.checkBoxControl}>
                          <FormControl
                            component='fieldset'
                            className={classes.formControl}
                            data-tip='The certificate does not expire?'>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id={`certifications[${index}].doesNotExpire`}
                                    name='gilad'
                                  />
                                }
                                label='Does not expire?'
                              />
                            </FormGroup>
                          </FormControl>
                        </Container>
                        <Container
                          maxWidth={false}
                          className={classes.formControl}>
                          <Button
                            variant='contained'
                            onClick={() => {
                              if (!!item.name) {
                                item['_destroy'] = true;
                                setDeletedCertifications((prevItems) => [
                                  ...prevItems,
                                  item,
                                ]);
                              }
                              certificationForm.remove(index);
                            }}
                            color='secondary'
                            startIcon={<Icon>remove_circle</Icon>}>
                            Remove Certification
                          </Button>
                        </Container>
                      </CardContent>
                    </Card>
                  ))}
                  <section className={classes.formControl}>
                    <Button
                      variant='contained'
                      onClick={() => certificationForm.append({})}
                      color='primary'
                      startIcon={<Icon>add_circle</Icon>}>
                      Add Certification
                    </Button>
                  </section>
                </Container>
              </Container>
            </Paper>
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
