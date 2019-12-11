import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useForm from 'react-hook-form';

import { resetPassword } from '../salesRepsAPI';
import { SET_ERROR_MESSAGE } from '../context/contextAction';
import { useSalesRepState } from '../context';
import { useAuth } from '../../auth/auth';

import useSalesRepFormStyle from '../styles/salesRepForm';

const ResetPasswordForm = ({ salesRep, closeForm }) => {
  const { register, handleSubmit, errors, getValues } = useForm();
  const { authTokens, setAuthTokens } = useAuth();
  const [, dispatch] = useSalesRepState();
  const classes = useSalesRepFormStyle();

  function onSubmitResetPassword(data) {
    resetPassword(salesRep[0], data.password, authTokens)
      .then(() => {
        closeForm();
      })
      .catch((response) => {
        if (response.status === 401) {
          localStorage.removeItem('tokens');
          localStorage.removeItem('users');
          setAuthTokens();
        } else {
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: 'حدث خطأ أثناء الاتصال بالخادم',
          });
        }
      });
  }

  return (
    <Container component='main' maxWidth='xs' dir={'rtl'}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          إعادة تعيين كلمة المرور
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmitResetPassword)}
          id={'resetPasswordForm'}
          className={classes.form}
          noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                name='password'
                label='كلمة المرور'
                id='password'
                type='password'
                inputRef={register({
                  required: 'برجاء ادخال كلمة المرور',
                })}
                error={errors.password}
                helperText={errors.password && errors.password.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                name='confirmPassword'
                label='تاكيد كلمة المرور'
                id='confirm-password'
                type='password'
                inputRef={register({
                  required: 'برجاء تاكيد ادخال كلمة المرور',
                  validate: (value) =>
                    value === getValues().password ||
                    'برجاء تاكد من تطابق كلمه المرور',
                })}
                error={errors.confirmPassword}
                helperText={
                  errors.confirmPassword && errors.confirmPassword.message
                }
              />
            </Grid>
          </Grid>
          <Button
            tabIndex='7'
            id={'reset_password_submit_btn'}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            حفظ
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ResetPasswordForm;
