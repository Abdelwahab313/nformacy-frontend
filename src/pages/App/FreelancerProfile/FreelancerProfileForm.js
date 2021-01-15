import React, { useCallback, useRef, useState } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import StepOne from './StepOne';
import StepsIndicator from './StepsIndicator';
import {
  formStyle,
  nextButtonStyles,
  stepIndicatorStyles,
  useStyles,
} from '../../../styles/formsStyles';
import { Box, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import {
  completeFreelancerProfile,
  completeClientProfile,
  uploadCV,
} from '../../../apis/userAPI';
import { useHistory } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import BackDialog from './BackDialog';
import t from '../../../locales/en/freelancerProfile.json';
import ClientStepOne from 'components/forms/ClientStepOne';
import ClientStepTwo from 'components/forms/ClientStepTwo';
import authManager from 'services/authManager';
import { RoutesPaths } from 'constants/routesPath';
import LinkText from 'components/typography/LinkText';

const FreeLancerProfileForm = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const {
    register,
    errors,
    setError,
    control,
    getValues,
    setValue,
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      ...user.current,
      mobileNumber: user.current.mobileNumber || '',
      majorFieldsOfExperience: user.current.majorFieldsOfExperience || [],
      specificFieldsOfExperience: user.current.specificFieldsOfExperience || [],
    },
  });
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [deletedExperiences, setDeletedExperiences] = useState([]);
  const [deletedEducations, setDeletedEducations] = useState([]);
  const [deletedCertification, setDeletedCertifications] = useState([]);

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [cv, setCV] = useState();
  const [isBackDialogueOpen, setIsDialogueOpen] = useState(false);
  const [isConfirmedBack, setIsConfirmedBack] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const stepsFields = [
    ['gender', 'country', 'mobileNumber', 'currentEmploymentStatus'],
    [
      'industriesOfExperience',
      'majorFieldsOfExperience',
      'specificFieldsOfExperience',
      'languageOfAssignments',
      'typesOfAssignments',
    ],
    [],
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

  function validateNestedFields(userToBeSubmitted) {
    let experiences = [...userToBeSubmitted.experiences];
    experiences = experiences.filter(
      (exp) => !deletedExperiences.includes(exp),
    );
    let educations = [...userToBeSubmitted.educations];
    educations = educations.filter((edu) => !deletedEducations.includes(edu));
    if (experiences.length === 0) {
      setError(
        'experiencesLength',
        'manual',
        'At least one experience required',
      );
    }
    if (educations.length === 0) {
      setError('educationLength', 'manual', 'At least one education required');
    }
    return educations.length !== 0 && experiences.length !== 0;
  }

  const onSubmit = (userDate) => {
    if (authManager.isNormalUser()) {
      onSubmitFreelancer(userDate);
    } else {
      onSubmitClient(userDate);
    }
  };

  const onSubmitClient = (userData) => {
    const userToBeSubmitted = {
      ...user.current,
      ...userData,
    };
    setLoading(true);
    completeClientProfile(userToBeSubmitted)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        history.push(RoutesPaths.App.Dashboard, {
          isRecentlyRegistered: false,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmitFreelancer = (userData) => {
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
    const nestedFieldsValid = validateNestedFields(userToBeSubmitted);
    if (nestedFieldsValid && cv?.length > 0) {
      setLoading(true);
      completeFreelancerProfile(userToBeSubmitted)
        .then((response) => {
          localStorage.setItem('user', JSON.stringify(response.data));
          if (cv?.length === 0 || cv === undefined) {
            history.push('/user/success');
          }
        })
        .finally(() => {
          if (cv?.length === 0 || cv === undefined) {
            setLoading(false);
          }
        });

      if (cv?.length > 0) {
        const file = new Blob(cv);
        const formData = new FormData();
        formData.append('cv', file, cv[0].name);

        uploadCV(formData, user.current.id)
          .then((response) => {
            const userFromStorage = JSON.parse(localStorage.getItem('user'));
            userFromStorage.cv = response.data.cv;
            localStorage.setItem('user', JSON.stringify(userFromStorage));
            history.push('/user/success');
          })
          .finally(() => setLoading(false));
      }
    } else if (cv?.length === 0 || cv === undefined) {
      setError('cv', 'manual', t['requiredMessage']);
    }
  };

  function proceedToNextStep() {
    if (activeStep < 2) {
      user.current = { ...user.current, ...getValues(stepsFields[activeStep]) };
      setActiveStep(activeStep + 1);
    }
  }

  function getBackToPreviousStep() {
    setIsDialogueOpen(true);
  }

  const onClickAgree = () => {
    setIsConfirmedBack(true);
    setIsDialogueOpen(false);
    if (activeStep > 0) {
      reset(user.current);
      setActiveStep(activeStep - 1);
    }
  };

  const onClickCancel = () => {
    setIsConfirmedBack(false);
    setIsDialogueOpen(false);
  };
  const onTermsChecked = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  const isClientEmployed = watch('isEmployed');
  return (
    <div className={classes.freelancerProfileContainer}>
      <Hidden smDown>
        <div style={stepIndicatorStyles.container}>
          <StepsIndicator activeStep={activeStep} />
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
          {activeStep === 0 && authManager.isNormalUser() && <StepOne />}
          {activeStep === 1 && authManager.isNormalUser() && <StepTwo />}
          {activeStep === 2 && <StepThree />}

          {activeStep === 0 && authManager.isClient() && <ClientStepOne />}
          {activeStep === 1 && authManager.isClient() && <ClientStepTwo />}
        </FormContext>
        <Grid
          item
          className={[classes.buttonsContainer, classes.nextBtnContainer]}
          className={
            activeStep === 0
              ? classes.nextBtnContainer
              : [classes.nextBtnContainer, classes.nextBtnContainerFlexEnd]
          }
          xs={12}
          sm={7}
          lg={5}>
          {activeStep !== 0 && (
            <Button
              onClick={getBackToPreviousStep}
              id='backButton'
              disabled={loading}
              variant='contained'
              startIcon={<ArrowBackIosIcon />}>
              {t['back']}
            </Button>
          )}
          {activeStep === 2 ||
          (authManager.isClient() && activeStep === 1) ||
          (authManager.isClient() && !isClientEmployed) ? (
            <Box
              display={'flex'}
              width={'100%'}
              justifyContent={'space-between'}
              margin={'0 16px'}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={onTermsChecked}
                    name='termsChecked'
                    color='primary'
                  />
                }
                label={
                  <LinkText
                    className={classes.termsLinkColor}
                    to={RoutesPaths.App.TermsAndConditions}>
                    I agree to the terms and conditions of the website
                  </LinkText>
                }
              />
              {isTermsChecked && (
                <Button
                  id='submitButton'
                  type='submit'
                  disabled={loading}
                  variant='contained'
                  style={nextButtonStyles(loading)}
                  endIcon={<DoneIcon />}>
                  {t['submit']}
                </Button>
              )}
            </Box>
          ) : (
            <Button
              id='nextButton'
              disabled={stepValid() || loading}
              onClick={proceedToNextStep}
              variant='contained'
              style={nextButtonStyles(stepValid() || loading)}
              endIcon={<ArrowForwardIosIcon />}>
              {t['next']}
            </Button>
          )}
        </Grid>
      </form>
      <BackDialog
        open={isBackDialogueOpen}
        isAgreed={isConfirmedBack}
        onAgree={onClickAgree}
        onCancel={onClickCancel}
      />
    </div>
  );
};

export default FreeLancerProfileForm;
