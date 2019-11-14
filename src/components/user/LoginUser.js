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
import login from '../../apis/authAPI';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router';

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
  const onSubmit = (data) => {
    setLoginFailed(false);
    setLoading(true);
    login(data)
      .then(() => setLoginSuccess(true))
      .catch(({ response }) => {
        if (response.data.error === 'invalid_credentials') {
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
  if (loginSuccess) {
    return <Redirect push to='/clients/list' />;
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