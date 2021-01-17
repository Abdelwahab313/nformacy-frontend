import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import ErrorDialog from '../../components/errors/ErrorDialog';
import { useStyles } from 'styles/formsStyles';
import { useTranslation } from 'react-i18next';

const ForgetPassword = () => {
  const classes = useStyles();
  const { register, errors } = useForm();
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const { t } = useTranslation();

  const handleTextChange = () => {
    setLoginFailed(false);
  };
  return (
    <Grid
      container
      className={classes.logInPageContainer}
      alignContent={'center'}>
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
        <Grid item xs={12} md={6} className={[classes.paper, classes.forgetPasswordForm]}>
          <Typography className={[classes.pageHeaderStyle, classes.forgetPasswordHeader]}>
            {t('forgetPassword')}
          </Typography>
          <form
            id='loginUserForm'
            className={classes.form}
            noValidate
            onSubmit={() => { }}>
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
            {loginFailed && (
              <span id={'loginFailedMessage'} className={classes.error}>
                {t('Invalid Email or password')}
              </span>
            )}
            <div className={classes.logInButtonContainer}>
              <Button
                id='login'
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}>
                {t('submit')}
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Grid >
  );
};

export default ForgetPassword;
