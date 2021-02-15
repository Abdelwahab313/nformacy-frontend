import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import StepOne from './StepOne';
import StepsIndicator from './StepsIndicator';
import {
  formStyle,
  nextButtonStyles,
  stepIndicatorStyles,
  useStyles,
} from '../../../styles/formsStyles';
import { Checkbox, FormControlLabel } from '@material-ui/core';
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
  updateProfile,
} from 'apis/userAPI';
import { useHistory } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import BackDialog from './BackDialog';
import t from 'locales/en/freelancerProfile.json';
import ClientStepOne from 'components/forms/ClientStepOne';
import ClientStepTwo from 'components/forms/ClientStepTwo';
import authManager from 'services/authManager';
import { RoutesPaths } from 'constants/routesPath';
import LinkText from 'components/typography/LinkText';
import SubmitButton from 'components/buttons/SubmitButton';
import { getDashboardLinkAfterSignup } from 'services/navigation';
import { useAuth } from 'pages/auth/context/auth';
import { updateUser } from 'pages/auth/context/authActions';

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
      fields: user.current.fields || [],
    },
  });
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [, dispatch] = useAuth();
  const [deletedExperiences, setDeletedExperiences] = useState([]);
  const [deletedEducations, setDeletedEducations] = useState([]);
  const [deletedCertification, setDeletedCertifications] = useState([]);

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [cv, setCV] = useState();
  const [isBackDialogueOpen, setIsDialogueOpen] = useState(false);
  const [isConfirmedBack, setIsConfirmedBack] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const consultantStepsFields = [
    ['gender', 'country', 'mobileNumber', 'currentEmploymentStatus'],
    [
      'industriesOfExperience',
      'fields',
      'languageOfAssignments',
      'typesOfAssignments',
    ],
    [],
  ];

  const clientStepFields = [
    ['gender', 'country'],
    ['organizationLevel', 'jobTitle', 'company'],
  ];

  const isClientEmployed = watch('isEmployed');

  const currentStepFields = useMemo(() => {
    if (authManager.isClient()) {
      return clientStepFields[activeStep];
    } else {
      return consultantStepsFields[activeStep];
    }
  }, [activeStep]);

  const isCurrentstepInvalid = useCallback(() => {
    const hasAnyInvalidField = Object.keys(errors).some((error) =>
      currentStepFields.includes(error),
    );
    const anyFieldUninitialized = currentStepFields?.some(
      (field) => !getValues(field) || getValues(field)?.length === 0,
    );
    return hasAnyInvalidField || anyFieldUninitialized;
  }, [errors, activeStep]);

  const isFinalStep = useMemo(() => {
    return (
      activeStep === 2 ||
      (authManager.isClient() && activeStep === 1) ||
      (authManager.isClient() && !isClientEmployed)
    );
  }, [activeStep, isClientEmployed]);

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
        updateUser(dispatch, response.data);
        history.push(getDashboardLinkAfterSignup(true));
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
    if (nestedFieldsValid) {
      setLoading(true);
      completeFreelancerProfile(userToBeSubmitted)
        .then((response) => {
          updateUser(dispatch, response.data);
          if (cv?.length === 0 || cv === undefined) {
            history.push(getDashboardLinkAfterSignup(true));
          }
        })
        .finally(() => {
          if (cv?.length === 0 || cv === undefined) {
            setLoading(false);
          }
        });

      submitCV();
    }
  };

  const onClickSaveLater = () => {
    user.current = {
      ...user.current,
      ...getValues(consultantStepsFields[activeStep]),
    };
    updateProfile({ ...user.current })
      .then((response) => {
        updateUser(dispatch, response.data);
        if (cv?.length === 0 || cv === undefined) {
          history.push(getDashboardLinkAfterSignup(false));
        }
      })
      .finally(() => {
        if (cv?.length === 0 || cv === undefined) {
          setLoading(false);
        }
      });
    submitCV();
  };

  const submitCV = () => {
    if (cv?.length > 0) {
      const file = new Blob(cv);
      const formData = new FormData();
      formData.append('cv', file, cv[0].name);

      uploadCV(formData, user.current.id)
        .then((response) => {
          const userFromStorage = JSON.parse(localStorage.getItem('user'));
          userFromStorage.cv = response.data.cv;
          updateUser(dispatch, userFromStorage);
          history.push(getDashboardLinkAfterSignup(true));
        })
        .finally(() => setLoading(false));
    }
  };

  function proceedToNextStep() {
    if (activeStep < 2) {
      user.current = {
        ...user.current,
        ...getValues(consultantStepsFields[activeStep]),
      };
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

  const isGoNextDisabled = isCurrentstepInvalid() || loading;
  const isSubmitDisabled = !isTermsChecked || isCurrentstepInvalid() || loading;

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
          {activeStep === 2 && authManager.isNormalUser() && <StepThree />}

          {activeStep === 0 && authManager.isClient() && <ClientStepOne />}
          {activeStep === 1 && authManager.isClient() && <ClientStepTwo />}
        </FormContext>
        {!!isFinalStep && (
          <Grid
            item
            className={classes.acceptTermsContainer}
            xs={12}
            sm={6}
            lg={6}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={onTermsChecked}
                  name='termsChecked'
                  color='primary'
                  checked={isTermsChecked}
                />
              }
              label={
                <LinkText
                  className={classes.termsLinkColor}
                  to={RoutesPaths.App.TermsAndConditions}>
                  I agree with the terms and conditions
                </LinkText>
              }
            />
          </Grid>
        )}
        <Grid
          item
          className={
            activeStep === 0
              ? classes.nextBtnContainer
              : [classes.nextBtnContainer]
          }
          xs={12}
          sm={6}
          lg={6}>
          {activeStep !== 0 && (
            <SubmitButton
              buttonText={t['back']}
              onClick={getBackToPreviousStep}
              id='backButton'
              disabled={loading}
              variant='contained'
              className={classes.backButton}
              startIcon={<ArrowBackIosIcon />}
            />
          )}
          <SubmitButton
            id='continueLater'
            buttonText='complete later'
            color='secondary'
            onClick={onClickSaveLater}
            className={classes.continueLaterBtn}
          />

          {!!isFinalStep ? (
            <SubmitButton
              buttonText={t['submit']}
              id='submitButton'
              type='submit'
              disabled={isSubmitDisabled}
              variant='contained'
              style={nextButtonStyles(isSubmitDisabled)}
              endIcon={<DoneIcon />}
            />
          ) : (
            <SubmitButton
              buttonText={t['next']}
              id='nextButton'
              disabled={isGoNextDisabled}
              onClick={proceedToNextStep}
              variant='contained'
              style={nextButtonStyles(isGoNextDisabled)}
              endIcon={<ArrowForwardIosIcon />}
            />
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
