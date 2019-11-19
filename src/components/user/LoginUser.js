import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useForm from 'react-hook-form';
import { login } from '../../apis/authAPI';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router';
import { useAuth } from '../../context/auth';
import ErrorDialog from '../errors/ErrorDialog';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progressContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  error: {
    color: 'red',
    margin: theme.spacing(1),
  },
}));

const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const { authTokens, setAuthTokens, setLoggedInUser, loadedLocal } = useAuth();
  const referer = props.location.state
    ? props.location.state.referer || '/'
    : '/';

  const onSubmit = (data) => {
    setLoginFailed(false);
    setLoading(true);
    login(data)
      .then((result) => {
        setAuthTokens(result.data.token);
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
          setErrorMessage('حدث خطأ أثناء الاتصال بالخادم');
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

  if (loginSuccess || (loadedLocal && authTokens)) {
    if (referer.pathname === '/logout') {
      return <Redirect push to='/users/list' />;
    }
    return <Redirect push to={referer} />;
  }
  if (loading) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container component='main' maxWidth='xs' dir='rtl'>
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
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          تسجيل الدخول
        </Typography>
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
            id='username'
            label='اسم المستخدم او رقم الموبايل'
            name='username'
            autoComplete='username'
            error={!!errors.username}
            autoFocus
          />
          {errors.username && (
            <span className={classes.error}>
              برجاء ادخال اسم المستخدم او رقم الهاتف
            </span>
          )}
          <TextField
            variant='outlined'
            margin='normal'
            inputRef={register({ required: true })}
            fullWidth
            name='password'
            label='كلمه المرور'
            type='password'
            id='password'
            onChange={handleTextChange}
            error={!!errors.password}
            autoComplete='current-password'
          />
          {errors.password && (
            <span className={classes.error}>برجاء ادخال كلمه السر</span>
          )}

          {loginFailed && (
            <span className={classes.error}>
              خطأ في اسم المستخدم او كلمه المرور
            </span>
          )}
          <Button
            id='login'
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            تسجيل الدخول
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
