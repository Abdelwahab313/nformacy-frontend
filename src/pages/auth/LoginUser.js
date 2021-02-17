import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation, useHistory } from 'react-router';
import { useAuth } from './context/auth';
import ErrorDialog from '../../components/errors/ErrorDialog';
import { useStyles } from 'styles/formsStyles';
import { login } from 'apis/authAPI';
import authManager from '../../services/authManager';
import { updateUser } from './context/authActions';
import { RoutesPaths } from 'constants/routesPath';
import { useTranslation } from 'react-i18next';
import useLocale from '../../hooks/localization/useLocale';
import CustomTypography from 'components/typography/Typography';

const Login = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [, dispatch] = useAuth();
  const location = useLocation();
  const { setLocale } = useLocale();
  const { t } = useTranslation();
  const history = useHistory();

  const isAdminLogin = location.pathname.indexOf('admin') > -1;

  const onSubmit = (data) => {
    setLoginFailed(false);
    login(data)
      .then(async (result) => {
        authManager.login(result.data.token);
        const user = result.data.user;
        updateUser(dispatch, user);
        setLocale(user.locale);
      })
      .then(() => {
        setLoginSuccess(true);
      })
      .catch((reason) => {
        if (
          reason.response.data.error === 'invalid_credentials' ||
          reason.response.data.error === 'unauthorized'
        ) {
          setLoginFailed(true);
        } else {
          setErrorMessage(t('Network Error'));
          setShowError(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTextChange = () => {
    setLoginFailed(false);
  };

  const getPostLoginRoute = () => {
    let postLoginRoute;
    let prevLink = location?.state?.referer?.pathname ? location?.state?.referer.pathname : location?.state?.referer;
    let isLogoutRoute =
      prevLink === RoutesPaths.App.Logout ||
      prevLink === RoutesPaths.Admin.Logout;

    if (!!prevLink && !isLogoutRoute) {
      postLoginRoute = prevLink;
    }
    else {
      postLoginRoute = isAdminLogin
        ? RoutesPaths.Admin.Home
        : RoutesPaths.App.Dashboard;
    }
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
          <Typography className={classes.pageHeaderStyle}>
            {!!isAdminLogin ? t('loginAdminTitle') : t('loginTitle')}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify={'space-evenly'} alignContent={'center'}>
        {showError && (
          <ErrorDialog
            message={errorMessage}
            close={() => {
              setShowError(false);
              setErrorMessage();
            }}
          />
        )}
        <CssBaseline />
        <Grid item xs={12} md={3}>
          <img
            src={require('../../assets/22759-girl-on-a-scooter.gif')}
            width={'100%'}
          />
        </Grid>
        <Grid item xs={12} md={6} className={classes.paper}>
          <form
            id='loginUserForm'
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant='outlined'
              margin='normal'
              inputRef={register({ required: true })}
              fullWidth
              onChange={handleTextChange}
              id='email'
              label={t('Email')}
              name='email'
              autoComplete='email'
              error={!!errors.email}
              autoFocus
            />
            {errors.email && (
              <span className={classes.error}>{t('emailEmptyError')}</span>
            )}
            <TextField
              variant='outlined'
              margin='normal'
              inputRef={register({ required: true })}
              fullWidth
              name='password'
              label={t('password')}
              type='password'
              id='password'
              onChange={handleTextChange}
              error={!!errors.password}
              autoComplete='current-password'
            />
            {errors.password && (
              <span className={classes.error}>{t('Password empty error')}</span>
            )}

            {loginFailed && (
              <span id={'loginFailedMessage'} className={classes.error}>
                {t('Invalid Email or password')}
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

export default Login;
