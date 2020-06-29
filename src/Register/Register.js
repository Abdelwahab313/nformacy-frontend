import Container from '@material-ui/core/Container';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import { withNamespaces } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from '../styles/formsStyles';
import { signup } from '../apis/userAPI';
import { useAuth } from '../auth/auth';
import { Redirect } from 'react-router';
import authManager from '../services/authManager';

const Register = ({ t }) => {
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
  const { setLoggedInUser } = useAuth();
  const classes = useStyles();

  const repeatVal = (passwordRepeat) =>
    passwordRepeat === getValues().password || 'Passwords do not match';
  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    signup(data)
      .then((result) => {
        authManager.login(result.data.token);
        setLoggedInUser(result.data.user);
        return result;
      })
      .then((result) => {
        setLoggedInUser(result.data.user);
        setRegisterSucceeded(true);
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
    return <Redirect push to='/user/profile' />;
  }
  return (
    <Container component='main' maxWidth='xs' dir='ltr'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountBoxIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t('Register')}
        </Typography>
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
            label={t('FirstName')}
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
            label={t('LastName')}
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
            label={t('Email')}
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
          <Button
            id='register'
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            {t('Register')}
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default withNamespaces('register')(Register);
