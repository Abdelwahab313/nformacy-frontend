import React, { useRef, useState, useMemo, useCallback } from 'react';
import {
  formStyle,
  stepIndicatorStyles,
  useStyles,
  nextButtonStyles,
} from '../../../styles/formsStyles';
import Hidden from '@material-ui/core/Hidden';
import { useTranslation } from 'react-i18next';
import classNames from 'clsx';
import StepsIndicator from './subComponents/StepsIndicator';
import ConsultantPartTwoStepOne from './subComponents/ConsultantPartTwoStepOne';
import { FormContext, useForm } from 'react-hook-form';
import authManager from 'services/authManager';
import DoneIcon from '@material-ui/icons/Done';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { submitFullProfile, uploadCV, updateProfile } from 'apis/userAPI';
import { updateUser } from 'pages/auth/context/authActions';
import { useAuth } from 'pages/auth/context/auth';
import { useHistory } from 'react-router-dom';
import { getDashboardLinkAfterSignup } from 'services/navigation';
import { Grid } from '@material-ui/core';
import SubmitButton from 'components/buttons/SubmitButton';
import ConsultantPartTwoStepTwo from './subComponents/ConsultantPartTwoStepTwo';
import TermsAndConditionsCheckbox from './subComponents/TermsAndConditionsCheckbox';
import BackButton from './subComponents/BackButton';

const ConsultantAdvancedRegistrationForm = () => {
  const currentUser = authManager.retrieveCurrentUser();
  delete currentUser.avatar;
  const user = useRef(currentUser);
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [deletedExperiences, setDeletedExperiences] = useState([]);
  const [deletedProjects, setDeletedProjects] = useState([]);
  const [deletedEducations, setDeletedEducations] = useState([]);
  const [deletedCertification, setDeletedCertifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, dispatch] = useAuth();
  const [cv, setCV] = useState();
  const history = useHistory();
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';

  const consultantStepsFields = [
    [],
    ['languageOfAssignments', 'typesOfAssignments'],
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
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      ...user.current,
    },
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
    return activeStep === 1;
  }, [activeStep]);

  const nestedFieldsValidation = () => {
    let isValid = true;
    const watchExperiences = watch('experiences');
    const watchEducations = watch('educations');

    if (activeStep === 0) {
      let experiences = [...watchExperiences];
      experiences = experiences.filter(
        (exp) => !deletedExperiences.includes(exp),
      );
      if (experiences.length === 0) {
        setError(
          'experiencesLength',
          'manual',
          'At least one experience required',
        );
        isValid = false;
      }
    } else {
      let educations = [...watchEducations];
      educations = educations.filter((edu) => !deletedEducations.includes(edu));
      if (educations.length === 0) {
        setError(
          'educationLength',
          'manual',
          'At least one education required',
        );
        isValid = false;
      }
    }
    return isValid;
  };

  const onSubmitFreelancer = (userData) => {
    const userToBeSubmitted = {
      ...user.current,
      ...userData,
      id: user.current.id,
      educations: !!userData.educations
        ? [...userData.educations, ...deletedEducations]
        : deletedEducations,
      certifications: !!userData.certifications
        ? [...userData.certifications, ...deletedCertification]
        : deletedCertification,
    };

    const nestedFieldsValid = nestedFieldsValidation();

    if (nestedFieldsValid) {
      setLoading(true);
      submitFullProfile(userToBeSubmitted)
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
    const userData = getValues({ nest: true });
    user.current = {
      ...user.current,
      ...userData,
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
          history.push(getDashboardLinkAfterSignup(false));
        })
        .finally(() => setLoading(false));
    }
  };

  const onClickGoBack = () => {
    if (activeStep > 0) {
      reset(user.current);
      setActiveStep(activeStep - 1);
    }
  };

  function proceedToNextStep() {
    const updatedFields = getValues({ nest: true });
    if (activeStep < 2 && nestedFieldsValidation()) {
      user.current = {
        ...user.current,
        ...updatedFields,
        experiences: !!updatedFields.experiences
          ? [...updatedFields.experiences, ...deletedExperiences]
          : deletedExperiences,
        prevProjects: !!updatedFields.prevProjects
          ? [...updatedFields.prevProjects, ...deletedProjects]
          : deletedExperiences,
      };
      setActiveStep(activeStep + 1);
    }
  }

  return (
    <div 
    className={classNames(classes.freelancerProfileContainer, {
      [classes.freelancerProfileContainerAr]: isArlang,
    })}
    >
      <Hidden smDown>
        <div style={stepIndicatorStyles.container}>
          <StepsIndicator user={user} activeStep={activeStep} />
        </div>
      </Hidden>

      <form
        id='multiStepForm'
        style={formStyle}
        noValidate
        onSubmit={handleSubmit(onSubmitFreelancer)}>
        <FormContext
          errors={errors}
          register={register}
          control={control}
          user={user}
          getValues={getValues}
          setValue={setValue}
          setDeletedExperiences={setDeletedExperiences}
          setDeletedProjects={setDeletedProjects}
          setDeletedEducations={setDeletedEducations}
          setDeletedCertifications={setDeletedCertifications}
          cv={cv}
          setCV={setCV}
          watch={watch}>
          {activeStep === 0 && <ConsultantPartTwoStepOne />}
          {activeStep === 1 && <ConsultantPartTwoStepTwo />}
        </FormContext>
        {!!isFinalStep && (
          <Grid
            item
            className={classes.acceptTermsContainer}
            xs={12}
            sm={6}
            lg={6}>
            <TermsAndConditionsCheckbox
              isTermsChecked={isTermsChecked}
              setIsTermsChecked={setIsTermsChecked}
            />
          </Grid>
        )}
        <Grid item className={classes.nextBtnContainer} xs={12} sm={6} lg={6}>
          {activeStep !== 0 && (
            <BackButton isLoading={loading} onClickGoBack={onClickGoBack} />
          )}
          <SubmitButton
            id='continueLater'
            buttonText={t('completeLater')}
            color='secondary'
            onClick={onClickSaveLater}
            className={classes.continueLaterBtn}
          />

          {!!isFinalStep ? (
            <SubmitButton
              buttonText={t('submit')}
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
              buttonText={t('next')}
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

export default ConsultantAdvancedRegistrationForm;
