import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles/formsStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import { login } from '../apis/authAPI';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router';
import { useAuth } from './auth';
import ErrorDialog from '../components/errors/ErrorDialog';
import { withNamespaces } from 'react-i18next';
import authManager from '../services/authManager';
import { Grid } from '@material-ui/core';

const Login = ({ location, t }) => {
  const { register, handleSubmit, errors } = useForm();
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const { setLoggedInUser, loadedLocal } = useAuth();
  const referer = location.state ? location.state.referer || '/' : '/';

  const onSubmit = (data) => {
    setLoginFailed(false);
    setLoading(true);
    login(data)
      .then((result) => {
        authManager.login(result.data.token);
        return result;
      })
      .then((result) => {
        setLoggedInUser(result.data.user);
      })
      .then(() => {
        setLoginSuccess(true);
      })
      .catch((reason) => {
        if (reason.message === 'Network Error') {
          setErrorMessage(t('Network Error'));
          setShowError(true);
        } else if (
          reason.response.data.error === 'invalid_credentials' ||
          reason.response.data.error === 'unauthorized'
        ) {
          setLoginFailed(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleTextChange = () => {
    setLoginFailed(false);
  };
  const classes = useStyles();

  const authToken = authManager.retrieveUserToken();
  if (loginSuccess || (loadedLocal && authToken)) {
    if (referer.pathname === '/logout') {
      return <Redirect push to='/'/>;
    }
    return <Redirect push to={referer}/>;
  }
  if (loading) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress/>
      </div>
    );
  }
  return (
    <Grid container className={classes.logInPageContainer} alignContent={'center'}>
      <Grid container alignContent='center' style={{height: 'fit-content', marginBottom: '50px'}}>
        <Grid item xs={1}/>
        <Grid item xs={10}>
          <Typography className={classes.pageHeaderStyle}>
            {t('Login')}
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
        <CssBaseline/>
        <Grid item xs={12} md={3}>
          <img src={require('../assets/22759-girl-on-a-scooter.gif')} width={'100%'}/>
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
              <span className={classes.error}>{t('Email empty error')}</span>
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
            <a className={classes.signupLink} href={'signup'}>
              Don't have account signup now!
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
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withNamespaces('login')(Login);
