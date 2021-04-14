import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from 'styles/formsStyles';
import { useTranslation } from 'react-i18next';
import useForm from 'pages/FormValidation/useForm';
import { validateResetPasswordForm } from 'pages/FormValidation/validateInfo';
import { confirmAccount } from 'apis/authAPI';
import { useHistory } from 'react-router';
import useQueryParams from 'hooks/useQueryParams';
import { useSnackBar } from 'context/SnackBarContext';
import { RoutesPaths } from 'constants/routesPath';

const WelcomeAccountFormPage = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { handleChange, values, handleSubmit, errors } = useForm(
    validateResetPasswordForm,
  );
  const query = useQueryParams();
  const resetPasswordToken = query.get('token');
  const emailToken = query.get('email');
  const history = useHistory();
  const { showSuccessMessage } = useSnackBar();
  const [responseMessage, setResponseMessage] = useState('');

  const onSubmit = (e) => {
    setResponseMessage('');
    handleSubmit(e, () => {
      confirmAccount(resetPasswordToken, values)
        .then((response) => {
          showSuccessMessage(response?.message);
          history.push(RoutesPaths.App.Accounts);
        })
        .catch((reason) => {
          setResponseMessage(
            !!reason?.response?.data?.error
              ? reason?.response?.data?.error
              : reason?.response?.data?.message,
          );
        });
    });
  };

  return (
    <Grid
      container
      className={classes.logInPageContainer}
      alignContent={'center'}>
      <Grid container justify={'space-evenly'} alignContent={'center'}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          md={6}
          className={[classes.paper, classes.forgetPasswordForm]}>
          <Typography
            className={[classes.pageHeaderStyle, classes.forgetPasswordHeader]}>
            {t('welcomeAccountSetPassword')}
          </Typography>
          <form id='loginUserForm' className={classes.form}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              name='firstName'
              label={t('firstName')}
              type='text'
              id='firstName'
              onChange={handleChange}
              autoComplete='on'
              autoFocus
            />
            {errors.firstName && (
              <span className={classes.error}>{errors.firstName}</span>
            )}
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              name='lastName'
              label={t('lastName')}
              type='text'
              id='lastName'
              onChange={handleChange}
              autoComplete='off'
            />
            {errors.lastName && (
              <span className={classes.error}>{errors.lastName}</span>
            )}
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              name='email'
              label={t('email')}
              type='email'
              id='email'
              onChange={handleChange}
              defaultValue={emailToken}
              disabled
            />
            {errors.email && (
              <span className={classes.error}>{errors.email}</span>
            )}
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              name='jobTitle'
              label={t('jobTitle')}
              type='text'
              id='jobTitle'
              onChange={handleChange}
            />
            {errors.jobTitle && (
              <span className={classes.error}>{errors.jobTitle}</span>
            )}
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              name='organizationName'
              label={t('organizationName')}
              type='text'
              id='organizationName'
              onChange={handleChange}
            />
            {errors.organizationName && (
              <span className={classes.error}>{errors.organizationName}</span>
            )}
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              name='password'
              label={t('password')}
              type='password'
              id='password'
              onChange={handleChange}
              autoComplete='current-password'
              value={values.password}
            />
            {errors.password && (
              <span className={classes.error}>{errors.password}</span>
            )}
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              name='confirmPassword'
              label={t('confirmPassword')}
              type='password'
              id='confirmPassword'
              onChange={handleChange}
              autoComplete='current-password'
              value={values.confirmPassword}
            />
            {errors.confirmPassword && (
              <span className={classes.error}>{errors.confirmPassword}</span>
            )}
            {responseMessage && (
              <span className={classes.error}>{responseMessage}</span>
            )}
            <div className={classes.logInButtonContainer}>
              <Button
                id='login'
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                onClick={onSubmit}
                className={classes.submit}>
                {t('submit')}
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WelcomeAccountFormPage;
