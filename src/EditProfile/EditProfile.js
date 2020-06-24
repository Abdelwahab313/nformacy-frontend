import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import useStyles from '../styles/formsStyles';
import { withNamespaces } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ImageUploader from 'react-images-upload';
import ReactTooltip from 'react-tooltip';
import countryList from 'react-select-country-list';
import ReactSelectMaterialUi from 'react-select-material-ui';
import CardContent from '@material-ui/core/CardContent';
import CreatableSelect from 'react-select/creatable';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
import HelpIcon from '@material-ui/icons/Help';

const EditProfile = ({ t }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const {
    register,
    getValues,
    control,
    errors,
    setError,
    handleSubmit,
  } = useForm({
    defaultValues: { ...user },
  });
  const experienceForm = useFieldArray({
    control,
    name: 'workExperience',
  });
  const educationForm = useFieldArray({
    control,
    name: 'education',
  });
  const certificationForm = useFieldArray({
    control,
    name: 'certification',
  });
  const [countries] = useState(countryList().getData());
  const classes = useStyles();

  console.log('formValues', getValues());
  const onSubmit = (userData) => {
    if (
      !!user.industriesOfExperience &&
      user.industriesOfExperience.length === 0
    ) {
      setError(
        'industriesOfExperience',
        'notMatch',
        'You have to choose at least one value',
      );
    }

    console.log('user data', userData);
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
                  autoFocus
                />
                {errors.firstName && (
                  <span className={classes.error}>
                    {errors.firstName.message}
                  </span>
                )}
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
                  autoFocus
                />
                {errors.lastName && (
                  <span className={classes.error}>
                    {errors.lastName.message}
                  </span>
                )}
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
                  autoFocus
                />
                {errors.email && (
                  <span className={classes.error}>{errors.email.message}</span>
                )}
              </Container>
            </Container>
          </Paper>
          <Paper className={classes.paperSection} elevation={5}>
            <Container>
              <Grid container alignItems='center'>
                <Grid item xs>
                  <Typography gutterBottom variant='h4'>
                    Personal info
                  </Typography>
                </Grid>
              </Grid>
              <Divider variant='middle' />
              <Container maxWidth={false} className={classes.formControl}>
                <FormControl className={classes.formControl}>
                  <Typography gutterBottom variant='subtitle2'>
                    Gender
                  </Typography>
                  <Controller
                    name='gender'
                    rules={{ required: 'this is required' }}
                    control={control}
                    defaultValue={user.gender || ''}
                    as={
                      <Select
                        className={classes.selectControl}
                        id='genderSelect'
                        defaultValue={user.gender || ''}
                        label='Gender'>
                        <MenuItem value={0} disabled>
                          Select your gender
                        </MenuItem>
                        {gender.map((e, key) => {
                          return (
                            <MenuItem key={key} value={e.value}>
                              {e.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    }
                  />
                </FormControl>
              </Container>
              <Container maxWidth={false} className={classes.formControl}>
                <div className={classes.formHeader}>
                  <Typography gutterBottom variant='subtitle2'>
                    Country
                  </Typography>
                  <HelpIcon
                    className={classes.formHeaderIcon}
                    data-tip='Select your country of residence'
                    color='primary'
                    fontSize='small'
                  />
                </div>

                <Controller
                  name='country'
                  rules={{ required: 'this is required' }}
                  control={control}
                  defaultValue={!user.country && 0}
                  as={
                    <ReactSelectMaterialUi
                      id='country-select'
                      fullWidth={true}
                      placeholder='Select your country'
                      SelectProps={{
                        styles: {
                          menu: (provided) => ({ ...provided, zIndex: 9999 }),
                        },
                        variant: 'outlined',
                      }}
                      options={countries}
                    />
                  }
                />
              </Container>
              <Container maxWidth={false} className={classes.formControl}>
                <Typography gutterBottom variant='subtitle2'>
                  Mobile Number
                </Typography>
                <TextField
                  variant='outlined'
                  margin='normal'
                  inputRef={register({ required: 'This field is required' })}
                  fullWidth
                  id='Mobile Number'
                  name='mobileNumber'
                  autoComplete='mobileNumber'
                  error={!!errors.mobileNumber}
                  autoFocus
                />
                {errors.mobileNumber && (
                  <span className={classes.error}>
                    {errors.mobileNumber.message}
                  </span>
                )}
              </Container>
              <Container maxWidth={false} className={classes.formControl}>
                <Typography gutterBottom variant='subtitle2'>
                  Current Employment Status
                </Typography>
                <FormControl className={classes.formControl} fullWidth>
                  <Controller
                    name='currentEmploymentStatus'
                    rules={{ required: 'this is required' }}
                    control={control}
                    defaultValue={!user.currentEmploymentStatus && 0}
                    as={
                      <Select
                        id='employmentStatus'
                        label='Current Employment Status'>
                        <MenuItem value={0} disabled>
                          Select your Employment Status
                        </MenuItem>
                        {employmentStatus.map((e, key) => {
                          return (
                            <MenuItem key={key} value={e.value}>
                              {e.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    }
                  />
                </FormControl>
              </Container>
            </Container>
          </Paper>
          <Paper className={classes.paperSection} elevation={5}>
            <Container>
              <Grid container alignItems='center'>
                <Grid item xs>
                  <Typography gutterBottom variant='h4'>
                    Fields of Specialization
                  </Typography>
                  <Typography variant='subtitle1' gutterBottom>
                    What are your areas of expertise as a subject matter expert,
                    and the industries you have deep knowledge in.
                  </Typography>
                </Grid>
              </Grid>
              <Divider variant='middle' />
              <Container maxWidth={false} className={classes.formControl}>
                <div className={classes.formHeader}>
                  <Typography gutterBottom variant='subtitle2'>
                    Industry of experience
                  </Typography>
                  <HelpIcon
                    className={classes.formHeaderIcon}
                    data-tip='You can choose more than one industry, if your industry is not listed please type it down.'
                    color='primary'
                    fontSize='small'
                  />
                </div>
                <Controller
                  name='industriesOfExperience'
                  rules={{ required: 'this is required' }}
                  control={control}
                  as={
                    <CreatableSelect
                      defaultValue={
                        !!user.industriesOfExperience
                          ? user.industriesOfExperience.map((userIndustry) => {
                              return industries.find(
                                (industry) => userIndustry === industry.value,
                              );
                            })
                          : []
                      }
                      isMulti
                      options={industries}
                    />
                  }
                />
                {errors.industriesOfExperience && (
                  <span className={classes.error}>
                    {errors.industriesOfExperience.message}
                  </span>
                )}
              </Container>
            </Container>
          </Paper>
          <Paper className={classes.paperSection} elevation={5}>
            <Container className={classes.nestedContainer}>
              <Grid container alignItems='center'>
                <Grid item xs>
                  <Typography gutterBottom variant='h4'>
                    Assignment Preferences
                  </Typography>
                  <Typography variant='subtitle1' gutterBottom>
                    What are your preferences in a project or assignment.
                  </Typography>
                </Grid>
              </Grid>
              <Divider variant='middle' />
              <Container maxWidth={false} className={classes.formControl}>
                <div className={classes.formHeader}>
                  <Typography gutterBottom variant='subtitle2'>
                    Assignment language
                  </Typography>
                  <HelpIcon
                    className={classes.formHeaderIcon}
                    data-tip='Your preferred languages of the assignments you want to tackle (You may select more than one option).<br> if your language is not listed please type it down.'
                    data-multiline={true}
                    color='primary'
                    fontSize='small'
                  />
                </div>
                <Controller
                  name='languageOfAssignments'
                  rules={{ required: 'this is required' }}
                  control={control}
                  as={
                    <CreatableSelect
                      defaultValue={
                        !!user.languageOfAssignments
                          ? user.languageOfAssignments.map(
                              (userAssignmentLanguage) => {
                                return assignmentLanguage.find(
                                  (assignmentLanguage) =>
                                    userAssignmentLanguage ===
                                    assignmentLanguage.value,
                                );
                              },
                            )
                          : []
                      }
                      isMulti
                      options={assignmentLanguage}
                    />
                  }
                />
              </Container>
              <Container maxWidth={false} className={classes.formControl}>
                <div className={classes.formHeader}>
                  <Typography gutterBottom variant='subtitle2'>
                    Types of Assignments
                  </Typography>
                  <HelpIcon
                    className={classes.formHeaderIcon}
                    data-tip='Your preferred types of the assignments you want to tackle (You may select more than one option)'
                    color='primary'
                    fontSize='small'
                  />
                </div>

                <Controller
                  name='typesOfAssignments'
                  rules={{ required: 'this is required' }}
                  control={control}
                  as={
                    <ReactSelect
                      isMulti
                      options={assignmentTypes}
                      className={classes.selectControl}
                      id='assignmentTypesSlect'
                      value={
                        !!user.typesOfAssignments
                          ? user.typesOfAssignments.map(
                              (userAssignmentType) => {
                                return assignmentTypes.find(
                                  (assignmentType) =>
                                    userAssignmentType === assignmentType.value,
                                );
                              },
                            )
                          : []
                      }
                      label='Assignment Types'>
                      <MenuItem value={0} disabled>
                        Select your gender
                      </MenuItem>
                      {gender.map((e, key) => {
                        return (
                          <MenuItem key={key} value={e.value}>
                            {e.name}
                          </MenuItem>
                        );
                      })}
                    </ReactSelect>
                  }
                />
              </Container>
              <Container maxWidth={false} className={classes.formControl}>
                <div className={classes.formHeader}>
                  <Typography gutterBottom variant='subtitle2'>
                    Location of Assignments
                  </Typography>
                  <HelpIcon
                    className={classes.formHeaderIcon}
                    data-tip='Your preferred location of the assignments you want to tackle (You may select more than one option).<br> if your language is not listed please type it down.'
                    data-multiline={true}
                    color='primary'
                    fontSize='small'
                  />
                </div>
                <Controller
                  name='locationOfAssignments'
                  rules={{ required: 'this is required' }}
                  control={control}
                  as={
                    <CreatableSelect
                      isMulti
                      options={assignmentLocations}
                      defaultValue={
                        !!user.locationOfAssignments
                          ? user.locationOfAssignments.map(
                              (userAssignmentLocation) => {
                                return assignmentLocations.find(
                                  (assignmentLocation) =>
                                    userAssignmentLocation ===
                                    assignmentLocation.value,
                                );
                              },
                            )
                          : []
                      }
                    />
                  }
                />
              </Container>
              <Container maxWidth={false} className={classes.formControl}>
                <Typography gutterBottom variant='subtitle2'>
                  Daily Rate
                </Typography>
                <TextField
                  variant='outlined'
                  margin='normal'
                  inputRef={register({ required: 'This field is required' })}
                  fullWidth
                  id='dailyRate'
                  name='dailyRate'
                  error={!!errors.dailyRate}
                  defaultValue={user.dailyRate}
                  autoFocus
                />
                {errors.dailyRate && (
                  <span className={classes.error}>
                    {errors.dailyRate.message}
                  </span>
                )}
              </Container>
            </Container>
          </Paper>
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
                      <Container
                        maxWidth={false}
                        className={classes.formControl}>
                        <TextField
                          fullWidth
                          label={t('JobTitle')}
                          variant='outlined'
                          name={`workExperience[${index}].title`}
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
                          name={`workExperience[${index}].company`}
                          defaultValue={item.company}
                          inputRef={register()}
                        />
                      </Container>
                      <Container className={classes.datesContainer}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Container
                            maxWidth={false}
                            className={classes.formControl}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant='inline'
                              format='MM/dd/yyyy'
                              margin='normal'
                              id={`workExperience[${index}].startDate`}
                              label='Start date'
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </Container>
                          <Container
                            maxWidth={false}
                            className={classes.formControl}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant='inline'
                              format='MM/dd/yyyy'
                              margin='normal'
                              id={`workExperience[${index}].endDate`}
                              label='end date'
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
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
                          data-tip='Do you still work there?'>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  id={`workExperience[${index}].toPresent`}
                                  name='gilad'
                                />
                              }
                              label='Present?'
                            />
                          </FormGroup>
                        </FormControl>
                      </Container>
                      <Container
                        maxWidth={false}
                        className={classes.formControl}>
                        <Button
                          variant='contained'
                          onClick={() => experienceForm.remove(index)}
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
                      <Container
                        maxWidth={false}
                        className={classes.formControl}>
                        <TextField
                          fullWidth
                          label={t('University')}
                          variant='outlined'
                          name={`education[${index}].school`}
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
                          name={`education[${index}].degree`}
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
                          name={`education[${index}].fieldOfStudy`}
                          defaultValue={item.fieldOfStudy}
                          inputRef={register()}
                        />
                      </Container>
                      <Container className={classes.datesContainer}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Container
                            maxWidth={false}
                            className={classes.formControl}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant='inline'
                              format='MM/dd/yyyy'
                              margin='normal'
                              id={`education[${index}].endDate`}
                              label='end date'
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </Container>
                        </MuiPickersUtilsProvider>
                      </Container>
                      <Container
                        maxWidth={false}
                        className={classes.formControl}>
                        <Button
                          variant='contained'
                          onClick={() => educationForm.remove(index)}
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
                      <Container
                        maxWidth={false}
                        className={classes.formControl}>
                        <TextField
                          fullWidth
                          label={t('Name')}
                          variant='outlined'
                          name={`certification[${index}].name`}
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
                          name={`certification[${index}].issuingOrganization`}
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
                          name={`certification[${index}].credential`}
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
                          name={`certification[${index}].credentialUrl`}
                          defaultValue={item.credentialUrl}
                          inputRef={register()}
                        />
                      </Container>
                      <Container className={classes.datesContainer}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Container
                            maxWidth={false}
                            className={classes.formControl}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant='inline'
                              format='MM/dd/yyyy'
                              margin='normal'
                              id={`certification[${index}].startDate`}
                              label='Start date'
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </Container>
                          <Container
                            maxWidth={false}
                            className={classes.formControl}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant='inline'
                              format='MM/dd/yyyy'
                              margin='normal'
                              id={`certification[${index}].endDate`}
                              label='end date'
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
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
                                  id={`certification[${index}].doesNotExpire`}
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
                          onClick={() => certificationForm.remove(index)}
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
            id='register'
            type='submit'
            variant='contained'
            color='primary'
            className={[classes.editButton, classes.submit]}>
            {t('Register')}
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default withNamespaces('editProfile')(EditProfile);
