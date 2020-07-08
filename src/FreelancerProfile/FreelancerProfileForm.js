import React, { useCallback, useRef, useState } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import StepOne from './StepOne';
import StepsIndicator from './StepsIndicator';
import {
  formStyle,
  navigationButtonsContainer,
  nextButtonStyles,
  stepIndicatorStyles,
  useStyles,
} from '../styles/formsStyles';
import { Button } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { updateProfile, uploadCV } from '../apis/userAPI';
import { useHistory } from 'react-router-dom';
import t from '../locales/en/freelancerProfile.json';
import Hidden from '@material-ui/core/Hidden';

const FreeLancerProfileForm = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const {
    register,
    errors,
    control,
    getValues,
    setValue,
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: { ...user.current },
  });
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [deletedExperiences, setDeletedExperiences] = useState([]);
  const [deletedEducations, setDeletedEducations] = useState([]);
  const [deletedCertification, setDeletedCertifications] = useState([]);

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [cv, setCV] = useState();
  const stepsFields = [
    ['gender', 'country', 'mobileNumber', 'currentEmploymentStatus'],
    [
      'industriesOfExperience',
      'majorFieldsOfExperience',
      'specificFieldsOfExperience',
      'languageOfAssignments',
      'typesOfAssignments',
    ],
  ];

  const stepValid = useCallback(() => {
    const hasAnyInvalidField = Object.keys(errors).some((error) =>
      stepsFields[activeStep].includes(error),
    );
    const anyFieldUninitialized = stepsFields[activeStep]?.some(
      (field) => getValues(field) === undefined,
    );
    return hasAnyInvalidField || anyFieldUninitialized;
  }, [errors, activeStep]);

  const onSubmit = (userData) => {
    setLoading(true);
    const userToBeSubmitted = {
      ...user.current,
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
        history.push('/user/success');
      })
      .catch((error) => {
      })
      .finally(() => setLoading(false));

    if (cv?.length > 0) {
      const file = new Blob(cv);
      const formData = new FormData();
      formData.append('cv', file, cv[0].name);

      uploadCV(formData, user.current.id)
        .then((response) => {
          localStorage.setItem('user', JSON.stringify(response.data));
        })
        .catch((error) => {
        });
    }
  };

  function proceedToNextStep() {
    if (activeStep < 2) {
      user.current = { ...user.current, ...getValues(stepsFields[activeStep]) };
      setActiveStep(activeStep + 1);
    }
  }

  function getBackToPreviousStep() {
    if (activeStep > 0) {
      reset(user.current);
      setActiveStep(activeStep - 1);
    }
  }

  return (
    <div className={classes.freelancerProfileContainer}>
      <Hidden smDown>
        <div style={stepIndicatorStyles.container}>
          <StepsIndicator activeStep={activeStep}/>
        </div>
      </Hidden>
      <form
        id='multiStepForm'
        style={formStyle}
        noValidate
        onSubmit={handleSubmit(onSubmit)}>
        <FormContext
          errors={errors}
          register={register}
          control={control}
          user={user}
          getValues={getValues}
          setValue={setValue}
          setDeletedExperiences={setDeletedExperiences}
          setDeletedEducations={setDeletedEducations}
          setDeletedCertifications={setDeletedCertifications}
          cv={cv}
          setCV={setCV}
          watch={watch}>
          {activeStep === 0 && <StepOne/>}
          {activeStep === 1 && <StepTwo/>}
          {activeStep === 2 && <StepThree/>}
        </FormContext>
        <Grid
          item
          xs={12}
          md={10}
          style={
            activeStep === 0
              ? { ...navigationButtonsContainer, justifyContent: 'flex-end' }
              : navigationButtonsContainer
          }>
          {activeStep !== 0 && (
            <Button
              onClick={getBackToPreviousStep}
              disabled={loading}
              variant='contained'
              startIcon={<ArrowBackIosIcon/>}>
              {t['back']}
            </Button>
          )}
          {activeStep !== 2 && (
            <Button
              id='nextButton'
              disabled={stepValid() || loading}
              onClick={proceedToNextStep}
              variant='contained'
              style={nextButtonStyles(stepValid() || loading)}
              endIcon={<ArrowForwardIosIcon/>}>
              {t['next']}
            </Button>
          )}
          {activeStep === 2 && (
            <Button
              id='submitButton'
              type='submit'
              disabled={stepValid() || loading}
              variant='contained'
              style={nextButtonStyles(stepValid() || loading)}
              endIcon={<DoneIcon/>}>
              {t['submit']}
            </Button>
          )}
        </Grid>
      </form>
    </div>
  );
};

export default FreeLancerProfileForm;
