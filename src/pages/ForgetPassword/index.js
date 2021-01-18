import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from 'styles/formsStyles';
import { useTranslation } from 'react-i18next';
import useForm from '../FormValidation/useForm';
import { validateForgetPasswordForm } from '../FormValidation/validateInfo';
import { forgetPassword } from 'apis/authAPI';

const ForgetPassword = () => {
  const { handleChange, values, handleSubmit, errors } = useForm(
    validateForgetPasswordForm,
  );
  const classes = useStyles();
  const { t } = useTranslation();
  const [responseMessage, setResponseMessage] = useState('');

  const onSubmit = (e) => {
    setResponseMessage('');
    handleSubmit(e, () => {
      forgetPassword(values.email)
        .then((response) => {
          setResponseMessage(response?.message);
        })
        .catch((reason) => {
          setResponseMessage(reason?.response?.data?.error);
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
            {t('forgetPassword')}
          </Typography>
          <form id='loginUserForm' className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='email'
              label={t('Email')}
              name='email'
              autoComplete='email'
              autoFocus
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className={classes.error}>{errors.email}</span>
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

export default ForgetPassword;
