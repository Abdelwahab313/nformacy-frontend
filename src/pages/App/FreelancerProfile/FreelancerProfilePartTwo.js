import React, { useRef, useState, useMemo, useCallback } from 'react';
import {
  formStyle,
  stepIndicatorStyles,
  useStyles,
  nextButtonStyles
} from '../../../styles/formsStyles';
import Hidden from '@material-ui/core/Hidden';
import StepsIndicator from './StepsIndicator';
import ConsultantPartTwoStepOne from './ConsultantPartTwoStepOne';
import { FormContext, useForm } from 'react-hook-form';
import authManager from 'services/authManager';
import DoneIcon from '@material-ui/icons/Done';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import t from 'locales/en/freelancerProfile.json';

import {
  completeFreelancerProfile,
  uploadCV,
  updateProfile,
} from 'apis/userAPI';
import { updateUser } from 'pages/auth/context/authActions';
import { useAuth } from 'pages/auth/context/auth';
import { useHistory } from 'react-router-dom';
import { getDashboardLinkAfterSignup } from 'services/navigation';
import { Grid } from '@material-ui/core';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import SubmitButton from 'components/buttons/SubmitButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const FreelancerProfilePartTwo = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [deletedExperiences, setDeletedExperiences] = useState([]);
  const [deletedEducations, setDeletedEducations] = useState([]);
  const [deletedCertification, setDeletedCertifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, dispatch] = useAuth();
  const [cv, setCV] = useState();
  const history = useHistory();
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [, setOpen] = useState(false);
  const [, setIsDialogueOpen] = useState(false);

  const consultantStepsFields = [
    [],
  ];
  const {
    register,
    errors,
    setError,
    control,
    getValues,
    setValue,
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onChange',
    // defaultValues: {
    //   ...user.current,
    //   mobileNumber: user.current.mobileNumber || '',
    //   majorFieldsOfExperience: user.current.majorFieldsOfExperience || [],
    //   fields: user.current.fields || [],
    // },

  });
  const currentStepFields = useMemo(() => {
    return consultantStepsFields[activeStep];
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

  const isSubmitDisabled = !isTermsChecked || isCurrentstepInvalid() || loading;
  const isGoNextDisabled = isCurrentstepInvalid() || loading;

  const isFinalStep = useMemo(() => {
    return (
      activeStep === 2 ||
      (authManager.isClient() && user.current.accountType === 'client' && activeStep === 1)
    );
  }, [activeStep]);


  const onSubmit = (userDate) => {
    if (authManager.isNormalUser()) {
      onSubmitFreelancer(userDate);
    }
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
      ...getValues(currentStepFields),
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
          authManager.updateUser(userFromStorage);
          history.push(getDashboardLinkAfterSignup(true));
        })
        .finally(() => setLoading(false));
    }
  };
  const onTermsChecked = () => {
    setIsTermsChecked(!isTermsChecked);
  };
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  function getBackToPreviousStep() {
    setIsDialogueOpen(true);
  }
  function proceedToNextStep() {
    if (activeStep < 2) {
      user.current = {
        ...user.current,
        ...getValues(currentStepFields),
      };
      setActiveStep(activeStep + 1);
    }
  }

  return (
    <div className={classes.freelancerProfileContainer}>
      <Hidden smDown>
        <div style={stepIndicatorStyles.container}>
          <StepsIndicator user={user} activeStep={activeStep} />
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
          {activeStep === 0 && authManager.isNormalUser() && <ConsultantPartTwoStepOne />}
          {/* {activeStep === 1 && authManager.isNormalUser() && <StepTwo />} */}

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
                <CustomTypography
                  className={classes.termsLinkColor}
                  onClick={handleClickOpen}>
                  I agree with the terms and conditions
                </CustomTypography>
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
              className={classes.disabledNextButtonMobile}
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
    </div>
  );
};

export default FreelancerProfilePartTwo;