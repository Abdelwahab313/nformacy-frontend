import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React from 'react';
import useForm from 'react-hook-form';
import useSalesRepFormStyle from '../styles/salesRepForm';

const SalesRepForm = ({
  pageTitle,
  onSubmit,
  formType,
  first_name,
  last_name,
  phone_number,
  national_id,
  username,
}) => {
  const { register, handleSubmit, errors, getValues } = useForm();
  const classes = useSalesRepFormStyle();

  return (
    <Container component='main' maxWidth='xs' dir={'rtl'}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          {pageTitle}
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id={'addUserForm'}
          className={classes.form}
          noValidate>
          <Grid container spacing={2}>
            <Grid
              container
              direction='row'
              spacing={2}
              className={classes.nameGrid}>
              <Grid item xs={6}>
                <TextField
                  inputProps={{ tabIndex: '1', 'data-testid': 'first_name' }}
                  variant='outlined'
                  fullWidth
                  id='firstName'
                  label='الاسم الاول'
                  name='first_name'
                  defaultValue={first_name}
                  autoComplete='fname'
                  inputRef={register({
                    required: 'برجاء ادخال اسم الموظف الأول',
                  })}
                  error={!!errors.first_name}
                  helperText={errors.first_name && errors.first_name.message}
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  inputProps={{ tabIndex: '2', 'data-testid': 'last_name' }}
                  autoComplete='lname'
                  name='last_name'
                  defaultValue={last_name}
                  variant='outlined'
                  fullWidth
                  id='lastName'
                  label='الاسم الاخير'
                  inputRef={register({
                    required: 'برجاء ادخال اسم الموظف الاخير',
                  })}
                  error={!!errors.last_name}
                  helperText={errors.last_name && errors.last_name.message}
                />
              </Grid>
            </Grid>
            {formType === 'ADD' && (
              <Grid container item spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    inputProps={{ tabIndex: '3', 'data-testid': 'password' }}
                    variant='outlined'
                    fullWidth
                    name='password'
                    label='كلمه المرور'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    inputRef={register({ required: 'برجاء ادخال كلمه السر' })}
                    error={!!errors.password}
                    helperText={errors.password && errors.password.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputProps={{
                      tabIndex: '3',
                      'data-testid': 'confirm-password',
                    }}
                    variant='outlined'
                    fullWidth
                    name='confirmPassword'
                    label='تاكيد كلمة المرور'
                    type='password'
                    id='confirm-password'
                    inputRef={register({
                      required: 'برجاء تاكيد ادخال كلمة المرور',
                      validate: (value) =>
                        value === getValues().password ||
                        'برجاء تاكد من تطابق كلمه المرور',
                    })}
                    error={!!errors.confirmPassword}
                    helperText={
                      errors.confirmPassword && errors.confirmPassword.message
                    }
                  />
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                inputProps={{ tabIndex: '4', 'data-testid': 'national_id' }}
                variant='outlined'
                fullWidth
                name='national_id'
                defaultValue={national_id}
                label='الرقم القومى'
                id='nationalId'
                inputRef={register({
                  required: 'برجاء ادخال الرقم القومى',
                  pattern: {
                    value: /^[0-9]{14}$/,
                    message: 'الرقم يجب ان يكون ١٤ رقم',
                  },
                })}
                error={!!errors.national_id}
                helperText={errors.national_id && errors.national_id.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={{ tabIndex: '5', 'data-testid': 'username' }}
                variant='outlined'
                fullWidth
                name='username'
                defaultValue={username}
                label='اسم تسجيل الدخول'
                id='userName'
                inputRef={register({
                  required: 'برجاء ادخال اسم تسجيل الدخول',
                  pattern: {
                    value: /^[^0-9][a-zA-Z0-9_]+$/,
                    message: 'اسم تسجيل الدخول غير صالح',
                  },
                })}
                error={!!errors.username}
                helperText={errors.username && errors.username.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={{ tabIndex: '6', 'data-testid': 'phone_number' }}
                variant='outlined'
                fullWidth
                name='phone_number'
                defaultValue={phone_number}
                label='رقم الموبايل'
                id='phone_number'
                inputRef={register({
                  required: 'برجاء ادخال رقم الهاتف',
                  pattern: {
                    value: /(01)(?=\d{9}$)\d+$/,
                    message: 'رقم الهاتف غير صحيح',
                  },
                })}
                error={!!errors.phone_number}
                helperText={errors.phone_number && errors.phone_number.message}
              />
            </Grid>
          </Grid>
          <Button
            tabIndex='7'
            id={'save_sales_rep_submit_btn'}
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

export default SalesRepForm;
