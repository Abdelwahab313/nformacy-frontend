import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation, useHistory } from 'react-router';
import { useStyles } from 'styles/formsStyles';
import { login } from 'apis/authAPI';
import authManager from '../../services/authManager';
import { RoutesPaths } from 'constants/routesPath';
import { useTranslation } from 'react-i18next';
import useLocale from '../../hooks/localization/useLocale';
import CustomTypography from 'components/typography/Typography';
import {
  useGoogleReCaptcha,
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';
import { GOOGLE_RECAPTCHA_URL } from 'settings';
import ErrorMessage from 'components/errors/ErrorMessage';
import clsx from 'clsx';
import SocialLogin from './subComponents/SocialLogin';

const Login = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const location = useLocation();
  const { setLocale } = useLocale();
  const { t } = useTranslation();
  const history = useHistory();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const isAdminLogin = location.pathname.indexOf('admin') > -1;

  const onSubmit = (data) => {
    setLoginErrorMessage('');
    if (!!executeRecaptcha) {
      executeRecaptcha('login_page').then(() => {
        // TODO needs to handle response from captcha
        // console.log('++++++++', token);
      });
    }
    login(data)
      .then(async (result) => {
        authManager.login(result.data.token);
        const user = result.data.user;
        authManager.updateUser(user);
        setLocale(user.locale);
      })
      .then(() => {
        setLoginSuccess(true);
      })
      .catch((reason) => {
        let error = '';
        if (reason?.response?.status === 401) {
          error = t('Invalid Email or password');
        } else if (reason?.response?.status === 429) {
          error =
            reason?.response?.data?.message ||
            t("You've performed this action many times.");
        }
        setLoginErrorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTextChange = () => {
    setLoginErrorMessage('');
  };

  const getPostLoginRoute = () => {
    let postLoginRoute;
    postLoginRoute = authManager.isAdmin()
      ? RoutesPaths.Admin.Home
      : RoutesPaths.App.Dashboard;
    window.location.replace(postLoginRoute);
  };

  const authToken = authManager.retrieveUserToken();
  if (loginSuccess || authToken) {
    getPostLoginRoute();
  }

  if (loading) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <Grid
      container
      className={classes.logInPageContainer}
      alignContent={'center'}>
      <Grid
        container
        alignContent='center'
        className={classes.loginInTitleContainer}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Typography
            className={clsx(classes.loginPageTitle, classes.pageHeaderStyle)}>
            {!!isAdminLogin ? t('loginAdminTitle') : t('loginTitle')}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify={'space-evenly'} alignContent={'center'}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          md={12}
          className={[classes.paper, classes.loginMobile]}>
          <form
            id='loginUserForm'
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant='outlined'
              margin='normal'
              inputRef={register({
                required: t('emailEmptyError'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: t('invalidEmail'),
                },
              })}
              fullWidth
              id='email'
              label={t('Email')}
              type='email'
              name='email'
              autoComplete='email'
              onChange={handleTextChange}
              error={!!errors.email}
              autoFocus
            />

            <ErrorMessage errorField={errors?.email} />

            <TextField
              variant='outlined'
              margin='normal'
              inputRef={register({
                required: t('passwordEmptyError'),
                minLength: {
                  value: 6,
                  message: t('invalidPasswordError'),
                },
              })}
              fullWidth
              name='password'
              label={t('password')}
              type='password'
              id='password'
              onChange={handleTextChange}
              error={!!errors.password}
              autoComplete='password'
            />
            <ErrorMessage errorField={errors?.password} />

            {!!loginErrorMessage && (
              <span id={'loginFailedMessage'} className={classes.error}>
                {loginErrorMessage}
              </span>
            )}
            <a
              className={classes.forgetPasswordLink}
              href={RoutesPaths.App.ForgetPassword}>
              {t('forgetPassword')}
            </a>
            <div className={classes.logInButtonContainer}>
              <Button
                id='login'
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}>
                {t('Login')}
              </Button>
            </div>
            <SocialLogin />

            {!isAdminLogin && (
              <>
                <CustomTypography className={classes.newUser}>
                  <span className={classes.newUserText}>
                    {t('dontHaveAccount')}
                  </span>
                </CustomTypography>
                <div className={classes.signUpButtonContainer}>
                  <Button
                    id='signup'
                    fullWidth
                    variant='contained'
                    onClick={() => history.push(RoutesPaths.App.Signup)}
                    className={[classes.submit, classes.signupButton]}>
                    <a className={classes.signupLink}>{t('goSignupBtn')}</a>
                  </Button>
                </div>
              </>
            )}
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

const LoginPageWithCaptha = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={GOOGLE_RECAPTCHA_URL}>
      <Login />
    </GoogleReCaptchaProvider>
  );
};

export default LoginPageWithCaptha;
