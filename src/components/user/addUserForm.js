import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { postUser } from '../../apis/usersApi';
import useForm from 'react-hook-form';
import { Redirect } from 'react-router';
import { useAuth } from '../../context/auth';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red',
    margin: theme.spacing(1),
  },
}));

const SignUp = ({ onClose }) => {
  const { register, handleSubmit, errors } = useForm();
  const [userCreatedFailed, setUserCreatedFailed] = useState(false);
  const [userCreatedSuccess, setUserCreatedSuccess] = useState(false);
  const { authTokens, setAuthTokens } = useAuth();
  const classes = useStyles();
  const onSubmit = (data) => {
    debugger;
    setUserCreatedFailed(false);
    postUser(data, authTokens)
      .then(() => setUserCreatedSuccess(true))
      .catch(({ response }) => {
        debugger;
        if (response.status === 400) {
          setUserCreatedFailed(true);
        }
        if (response.status === 401) {
          localStorage.removeItem('tokens');
          localStorage.removeItem('users');
          setAuthTokens();
        }
      });
  };
  if (userCreatedSuccess) {
    onClose();
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          اضافه موظف جديد
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id={'addUserForm'}
          className={classes.form}
          noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='lname'
                name='last_name'
                variant='outlined'
                fullWidth
                id='lastName'
                label='الاسم الاخير'
                inputRef={register({ required: true })}
                error={!!errors.last_name}
                autoFocus
              />
            </Grid>
            {errors.last_name && (
              <span className={classes.error}>
                {' '}
                برجاء ادخال اسم الموظف الثانى
              </span>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                fullWidth
                id='firstName'
                label='الاسم الاول'
                name='first_name'
                autoComplete='fname'
                inputRef={register({ required: true })}
                error={!!errors.first_name}
                autoFocus
              />
            </Grid>
            {errors.first_name && (
              <span className={classes.error}>
                {' '}
                برجاء ادخال اسم الموظف الأول
              </span>
            )}
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                name='password'
                label='كلمه المرور'
                type='password'
                id='password'
                autoComplete='current-password'
                inputRef={register({ required: true })}
                error={!!errors.password}
                autoFocus
              />
            </Grid>
            {errors.password && (
              <span className={classes.error}>برجاء ادخال كلمه السر</span>
            )}
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                name='national_id'
                label='الرقم القومى'
                id='nationalId'
                inputRef={register({ required: true })}
                error={!!errors.national_id}
                autoFocus
              />
            </Grid>
            {errors.national_id && (
              <span className={classes.error}>برجاء ادخال الرقم القومى</span>
            )}
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                name='username'
                label='اسم تسجيل الدخول'
                id='userName'
                inputRef={register({ required: true })}
                error={!!errors.username}
                autoFocus
              />
            </Grid>
            {errors.username && (
              <span className={classes.error}>
                برجاء ادخال اسم تسجيل الدخول
              </span>
            )}
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                name='phone_number'
                label='رقم الموبايل'
                id='phone_number'
                inputRef={register({ required: true })}
                error={!!errors.phone_number}
                autoFocus
              />
            </Grid>
            {errors.phone_number && (
              <span className={classes.error}>برجاء ادخال رقم الهاتف</span>
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            حفظ
          </Button>
          {userCreatedFailed && (
            <span className={classes.error}>
              خطأ في الرقم القومى او رقم الهاتف
            </span>
          )}
        </form>
      </div>
    </Container>
  );
};
export default SignUp;
