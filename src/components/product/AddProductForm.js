import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import useForm from 'react-hook-form';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../context/auth';
import { postProduct } from '../../apis/productsApi';
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

const AddProductForm = ({ onClose }) => {
  const { register, handleSubmit, errors } = useForm();
  const [productCreatedFailed, setProductCreatedFailed] = useState(false);
  const [productCreatedSuccess, setProductCreatedSuccess] = useState(false);
  const [skuAlreadyExist, setSkuAlreadyExist] = useState(false);
  const [priceMustBeDigit, setPriceMustBeDigit] = useState(false);

  const { authTokens, setAuthTokens } = useAuth();
  const classes = useStyles();
  const onSubmit = (data) => {
    setProductCreatedFailed(false);
    postProduct(data, authTokens)
      .then(() => setProductCreatedSuccess(true))
      .catch(({ response }) => {
        if (response.status === 400) {
          setProductCreatedFailed(true);
          if (response.data.price) {
            setPriceMustBeDigit(true);
          } else {
            setSkuAlreadyExist(true);
          }
        }
        if (response.status === 401) {
          localStorage.removeItem('tokens');
          localStorage.removeItem('products');
          setAuthTokens();
        }
      });
  };
  if (productCreatedSuccess) {
    onClose();
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          اضافه منتج جديد
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id={'addProductForm'}
          className={classes.form}
          noValidate>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} lg={12}>
              <TextField
                autoComplete='name'
                name='name'
                variant='outlined'
                fullWidth
                id='productName'
                label='اسم المنتج'
                inputRef={register({ required: true })}
                autoFocus
              />
            </Grid>
            {errors.name && (
              <span className={classes.error}> برجاء ادخال اسم المنتج</span>
            )}
            <Grid item xs={6} sm={6} lg={12}>
              <TextField
                autoComplete='name'
                name='sku'
                variant='outlined'
                fullWidth
                id='sku'
                label='sku'
                inputRef={register({ required: true })}
                autoFocus
              />
            </Grid>
            {errors.sku && (
              <span className={classes.error}> برجاء ادخال الرقم التسلسلى</span>
            )}
            {skuAlreadyExist && (
              <span className={classes.error}>الرقم التسلسلى موجود</span>
            )}
            <Grid item xs={6} sm={6} lg={12}>
              <TextField
                autoComplete='name'
                name='price'
                variant='outlined'
                fullWidth
                id='price'
                label='سعر المنتج'
                inputRef={register({ required: true })}
                autoFocus
              />
            </Grid>
            {errors.price && (
              <span className={classes.error}> برجاء ادخال سعر المنتج</span>
            )}
            {priceMustBeDigit && (
              <span className={classes.error}>
                {' '}
                سعر المنتج يجب ان يكون رقما{' '}
              </span>
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
        </form>
      </div>
    </Container>
  );
};

export default AddProductForm;
