import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from '../../styles/formsStyles';
import { signup } from '../../apis/userAPI';
import { useAuth } from '../auth/context/auth';
import { useHistory } from 'react-router';
import authManager from '../../services/authManager';
import { Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { updateUser } from '../auth/context/authActions';
import clsx from 'clsx';
import { RoutesPaths } from 'constants/routesPath';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    setError,
    getValues,
    formState,
    triggerValidation,
  } = useForm();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [registerSucceeded, setRegisterSucceeded] = useState(false);
  const [, dispatch] = useAuth();
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  const repeatVal = (passwordRepeat) =>
    passwordRepeat === getValues().password || 'Passwords do not match';
  const onSubmit = (data) => {
    setLoading(true);
    signup(data)
      .then((result) => {
        authManager.login(result.data.token);

        updateUser(dispatch, result.data.user);
        setRegisterSucceeded(true);
        return result;
      })
      .catch(({ response }) => {
        response.data.errors.forEach((error) => {
          if (error.includes('Email')) {
            setError('email', 'Already exists', 'This email address is taken');
          }
        });
        setUser({
          firstName: data['firstName'],
          lastName: data['lastName'],
          email: data['email'],
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validateRepeat = () => {
    if (formState.isSubmitted) {
      triggerValidation({ name: 'passwordRepeat' });
    }
  };
  if (loading) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (registerSucceeded) {
    history.push(RoutesPaths.App.UserTypeSelection);
    // return <Redirect push to='/user/profile' />;
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
            {t('signUp')}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify={'space-evenly'} alignItems={'center'}>
        <CssBaseline />
        <Grid item xs={12} md={4}>
          <img src={require('../../assets/handshake.png')} width={'100%'} />
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
              inputRef={register({ required: 'This field is required' })}
              fullWidth
              id='firstName'
              label={t('firstName')}
              name='firstName'
              autoComplete='name'
              error={!!errors.firstName}
              defaultValue={user.firstName}
              onChange={(event) => {
                const { value } = event.target;
                setUser({ ...user, firstName: value });
              }}
              autoFocus
            />
            {errors.firstName && (
              <span className={classes.error}>{errors.firstName.message}</span>
            )}
            <TextField
              variant='outlined'
              margin='normal'
              inputRef={register({ required: 'This field is required' })}
              fullWidth
              id='lastName'
              label={t('lastName')}
              name='lastName'
              autoComplete='name'
              error={!!errors.lastName}
              defaultValue={user.lastName}
              onChange={(event) => {
                const { value } = event.target;
                setUser({ ...user, lastName: value });
              }}
              autoFocus
            />
            {errors.lastName && (
              <span className={classes.error}>{errors.lastName.message}</span>
            )}
            <TextField
              variant='outlined'
              margin='normal'
              inputRef={register({
                required: 'This field is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'invalid email address',
                },
              })}
              fullWidth
              id='email'
              label={t('email')}
              name='email'
              autoComplete='email'
              error={!!errors.email}
              defaultValue={user.email}
              onChange={(event) => {
                const { value } = event.target;
                setValue('email', value);
              }}
              autoFocus
            />
            {errors.email && (
              <span className={classes.error}>{errors.email.message}</span>
            )}
            <TextField
              variant='outlined'
              margin='normal'
              inputRef={register({
                required: 'This field is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
              fullWidth
              name='password'
              label={t('password')}
              type='password'
              id='password'
              error={!!errors.password}
              onChange={validateRepeat}
            />
            {errors.password && (
              <span className={classes.error}>{errors.password.message}</span>
            )}

            <TextField
              variant='outlined'
              margin='normal'
              inputRef={register({
                required: 'This field is required',
                validate: repeatVal,
              })}
              fullWidth
              name='confirmPassword'
              label={t('confirmPassword')}
              type='password'
              id='confirmPassword'
              error={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <span className={classes.error}>
                {errors.confirmPassword.message}
              </span>
            )}
            <div className={classes.signUpButtonContainer}>
              <Button
                id='register'
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={clsx([classes.submit, classes.alignRight])}>
                {t('signup')}
              </Button>
            </div>
            <CustomTypography className={classes.newUser}>
              <span className={classes.newUserText}>
                {t('alreadyHaveAccount')}
              </span>
            </CustomTypography>
            <div className={classes.signUpButtonContainer}>
              <Button
                id='signup'
                fullWidth
                variant='contained'
                onClick={() => history.push(RoutesPaths.App.Login)}
                className={[classes.submit, classes.signupButton]}>
                <a className={classes.signupLink}>{t('goLoginBtn')}</a>
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Register;
