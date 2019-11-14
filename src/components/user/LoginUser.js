import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useForm from 'react-hook-form';
import { string as yupstring, object as yupobject } from 'yup';

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
  error: {
    color: 'red',
    margin: theme.spacing(1),
  },
}));

const LoginSchema = yupobject().shape({
  username: yupstring().required(),
  password: yupstring().required('generic.password.required'),
});

const Login = (props) => {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: LoginSchema,
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  const classes = useStyles();
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
            inputRef={register}
            required
            fullWidth
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
            inputRef={register}
            required
            fullWidth
            name='password'
            label='كلمه المرور'
            type='password'
            id='password'
            error={!!errors.password}
            autoComplete='current-password'
          />
          {errors.password && (
            <span className={classes.error}>برجاء ادخال كلمه السر</span>
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
