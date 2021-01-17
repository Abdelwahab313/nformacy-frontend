import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from 'styles/formsStyles';
import { useTranslation } from 'react-i18next';
import useForm from 'pages/FormValidation/useForm';
import validate from 'pages/FormValidation/validateInfo';

const ResetPassword = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { handleChange, values, handleSubmit, errors } = useForm(validate);

  return (
    <Grid
      container
      className={classes.logInPageContainer}
      alignContent={'center'}>
      <Grid container justify={'space-evenly'} alignContent={'center'}>
        <CssBaseline />
        <Grid item xs={12} md={6} className={[classes.paper, classes.forgetPasswordForm]}>
          <Typography className={[classes.pageHeaderStyle, classes.forgetPasswordHeader]}>
            {t('resetPassword')}
          </Typography>
          <form
            id='loginUserForm'
            className={classes.form}
            onSubmit={handleSubmit}>
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
              <span className={classes.error}>
                {errors.password}
              </span>
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
              <span className={classes.error}>
                {errors.confirmPassword}
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

export default ResetPassword;
