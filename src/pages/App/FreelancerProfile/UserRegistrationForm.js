import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import StepOne from './subComponents/StepOne';
import StepsIndicator from './subComponents/StepsIndicator';
import {
  formStyle,
  nextButtonStyles,
  stepIndicatorStyles,
  useStyles,
} from 'styles/formsStyles';
import DoneIcon from '@material-ui/icons/Done';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Grid from '@material-ui/core/Grid';
import StepTwo from './subComponents/StepTwo';
import {
  completeFreelancerProfile,
  completeClientProfile,
  updateProfile,
} from 'apis/userAPI';
import { useHistory } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import t from 'locales/en/freelancerProfile.json';
import ClientStepOne from 'components/forms/ClientStepOne';
import ClientStepTwo from 'components/forms/ClientStepTwo';
import authManager from 'services/authManager';
import SubmitButton from 'components/buttons/SubmitButton';
import { getDashboardLinkAfterSignup } from 'services/navigation';
import { useAuth } from 'pages/auth/context/auth';
import { updateUser } from 'pages/auth/context/authActions';
import CorporateStepOne from 'pages/CorporateRegister/CorporateStepOne';
import CorporateStepTwo from 'pages/CorporateRegister/CorporateStepTwo';
import TermsAndConditionsCheckbox from './subComponents/TermsAndConditionsCheckbox';
import BackButton from './subComponents/BackButton';
import { submitQuestionAfterRegister } from './submitServiceRequestAfterSignup';

const UserRegistrationForm = () => {
  const currentUser = authManager.retrieveCurrentUser();
  const user = useRef(currentUser);
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
    defaultValues: {
      ...user.current,
      mobileNumber: user.current.mobileNumber || '',
      fields: user.current.fields || [],
    },
  });
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [, dispatch] = useAuth();

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const consultantStepsFields = [
    ['gender', 'country', 'mobileNumber', 'currentEmploymentStatus'],
    ['industriesOfExperience', 'fields'],
  ];

  const clientStepFields = [
    ['accountType'],
    ['country', 'organizationLevel', 'organizationName', 'jobTitle'],
  ];

  const corporateStepFields = [
    ['accountType'],
    ['organizationName', 'industriesOfExperience', 'country'],
    ['organizationLevel', 'jobTitle'],
  ];

  const isClientEmployed = watch('isEmployed');
  const isCorporateUser = authManager.isCorporate();

  const currentStepFields = useMemo(() => {
    if (authManager.isClient()) {
      if (!!isCorporateUser) {
        return corporateStepFields[activeStep];
      } else {
        return clientStepFields[activeStep];
      }
    } else {
      return consultantStepsFields[activeStep];
    }
  }, [activeStep, isCorporateUser]);

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
      (authManager.isClient() &&
        user.current.accountType === 'client' &&
        activeStep === 1) ||
      (authManager.isNormalUser() && activeStep === 1)
    );
  }, [activeStep, isClientEmployed]);

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
        submitQuestionAfterRegister();
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
      ...userData,
    };

    setLoading(true);
    completeFreelancerProfile(userToBeSubmitted)
      .then((response) => {
        updateUser(dispatch, response.data);
        history.push(getDashboardLinkAfterSignup(true));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onClickSaveLater = () => {
    user.current = {
      ...user.current,
      ...getValues(currentStepFields),
    };

    updateProfile({ ...user.current })
      .then((response) => {
        updateUser(dispatch, response.data);
        history.push(getDashboardLinkAfterSignup(false));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function proceedToNextStep() {
    if (activeStep < 2) {
      user.current = {
        ...user.current,
        ...getValues(currentStepFields),
      };
      setActiveStep(activeStep + 1);
    }
  }

  const onClickGoBack = () => {
    if (activeStep > 0) {
      reset(user.current);
      setActiveStep(activeStep - 1);
    }
  };

  const isGoNextDisabled = isCurrentstepInvalid() || loading;
  const isSubmitDisabled = !isTermsChecked || isCurrentstepInvalid() || loading;

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
          watch={watch}>
          {activeStep === 0 && authManager.isNormalUser() && <StepOne />}
          {activeStep === 1 && authManager.isNormalUser() && <StepTwo />}

          {activeStep === 0 && authManager.isClient() && <ClientStepOne />}
          {activeStep === 1 &&
            authManager.isClient() &&
            (isCorporateUser ? <CorporateStepOne /> : <ClientStepTwo />)}
          {activeStep === 2 && authManager.isClient() && <CorporateStepTwo />}
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

export default UserRegistrationForm;
