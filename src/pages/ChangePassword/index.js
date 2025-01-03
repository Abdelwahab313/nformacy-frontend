import React, { useState } from 'react';
import classNames from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from 'styles/formsStyles';
import { useTranslation } from 'react-i18next';
import useForm from '../FormValidation/useForm';
import { validateChangePasswordForm } from '../FormValidation/validateInfo';
import { changePassword } from 'apis/authAPI';
import { useSnackBar } from 'context/SnackBarContext';
import authManager from 'services/authManager';

const ChangePasswordPage = () => {
  const { handleChange, values, handleSubmit, errors } = useForm(
    validateChangePasswordForm,
  );
  const classes = useStyles();
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';
  const [responseMessage, setResponseMessage] = useState('');
  const { showSuccessMessage } = useSnackBar();

  const onSubmit = (e) => {
    setResponseMessage('');
    handleSubmit(e, () => {
      changePassword(values.currentPassword, values.newPassword)
        .then((response) => {
          showSuccessMessage(response?.message);
          authManager.logout();
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
            {t('changePassword')}
          </Typography>
          <form id='chengePasswordForm' className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='currentPassword'
              label={t('currentPassword')}
              name='currentPassword'
              autoComplete='off'
              type='password'
              autoFocus
              value={values.currentPassword}
              onChange={handleChange}
            />
            {errors.currentPassword && (
              <span className={classNames(classes.error, {
                [classes.errorAr]: isArlang,
              })}>{t(errors.currentPassword)}</span>
            )}
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='newPassword'
              label={t('newPassword')}
              name='newPassword'
              autoComplete='off'
              type='password'
              value={values.newPassword}
              onChange={handleChange}
            />
            {errors.newPassword && (
              <span className={classNames(classes.error, {
                [classes.errorAr]: isArlang,
              })}>{t(errors.newPassword)}</span>
            )}
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='confirmPassword'
              label={t('confirmPassword')}
              name='confirmPassword'
              autoComplete='off'
              type='password'
              value={values.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className={classNames(classes.error, {
                [classes.errorAr]: isArlang,
              })}>{t(errors.confirmPassword)}</span>
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

export default ChangePasswordPage;
