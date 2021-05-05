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
import { Checkbox, FormControlLabel, Dialog, DialogContent, Button } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';
import StepTwo from './StepTwo';
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
import SubmitButton from 'components/buttons/SubmitButton';
import { getDashboardLinkAfterSignup } from 'services/navigation';
import { useAuth } from 'pages/auth/context/auth';
import { updateUser } from 'pages/auth/context/authActions';
import Transition from 'components/animations/Transition';
import CustomTypography from 'components/typography/Typography';
import CorporateStepOne from 'pages/CorporateRegister/CorporateStepOne';
import CorporateStepTwo from 'pages/CorporateRegister/CorporateStepTwo';

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
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [cv, setCV] = useState();
  const [isBackDialogueOpen, setIsDialogueOpen] = useState(false);
  const [isConfirmedBack, setIsConfirmedBack] = useState(false);
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
    }
    else {
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
      (authManager.isClient() && user.current.accountType === 'client' && activeStep === 1) ||
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

  function proceedToNextStep() {
    if (activeStep < 2) {
      user.current = {
        ...user.current,
        ...getValues(currentStepFields),
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.freelancerProfileContainer}>
      <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        PaperProps={{ id: 'termsAndConditionsDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <Grid container>
            <Grid item md={12}>
              <CustomTypography fontWeight="fontWeightBold" variant='h5'>
                Terms and Conditions
              </CustomTypography>
            </Grid>
            <Grid item md={12} className={classes.comingSoon}>
              Coming Soon!
            </Grid>
            <Grid item md={6}>
              <SubmitButton onClick={handleClose} buttonText='Agree' />
            </Grid>
            <Grid item md={6}>
              <Button
                onClick={handleClose}
                variant="contained"
                className={classes.cancelConditionsBtn}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
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
          {activeStep === 0 && authManager.isNormalUser() && <StepOne />}
          {activeStep === 1 && authManager.isNormalUser() && <StepTwo />}

          {activeStep === 0 && authManager.isClient() && <ClientStepOne />}
          {activeStep === 1 && authManager.isClient() && (isCorporateUser ? <CorporateStepOne /> : <ClientStepTwo />)}
          {activeStep === 2 && authManager.isClient() && <CorporateStepTwo />}

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
