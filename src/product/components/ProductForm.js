import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import useForm from 'react-hook-form';
import useProductFormStyle from '../styles/productForm';

//TODO: review form validation
const ProductForm = ({
  pageTitle,
  onSubmit,
  name = '',
  price = '',
  sku = '',
}) => {
  const { register, handleSubmit, errors } = useForm();
  const classes = useProductFormStyle();
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          {pageTitle}
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          noValidate>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} lg={12}>
              <TextField
                autoComplete='name'
                name='name'
                variant='outlined'
                fullWidth
                id={'productName'}
                inputProps={{ 'data-testid': 'productName' }}
                label='اسم المنتج'
                defaultValue={name}
                inputRef={register({ required: 'برجاء ادخال اسم المنتج' })}
                autoFocus
                error={errors.name}
                helperText={errors.name && errors.name.message}
              />
            </Grid>
            <Grid item xs={6} sm={6} lg={12}>
              <TextField
                autoComplete='name'
                name='sku'
                variant='outlined'
                fullWidth
                id={'sku'}
                inputProps={{ 'data-testid': 'sku' }}
                label='sku'
                defaultValue={sku}
                error={errors.sku}
                inputRef={register({ required: 'برجاء ادخال الرقم التسلسلى' })}
                helperText={errors.sku && errors.sku.message}
              />
            </Grid>
            <Grid item xs={6} sm={6} lg={12}>
              <TextField
                autoComplete='name'
                name='price'
                variant='outlined'
                fullWidth
                id={'price'}
                inputProps={{ 'data-testid': 'price' }}
                label='سعر المنتج'
                defaultValue={price}
                error={errors.price}
                inputRef={register({
                  required: 'برجاء ادخال سعر المنتج',
                  pattern: {
                    value: /^[+-]?(\d*\.)?\d+$/,
                    message: 'السعر يجب ان يكون رقم',
                  },
                })}
                helperText={errors.price && errors.price.message}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            id={'add_product_submit_btn'}
            color='primary'
            className={classes.submit}>
            حفظ
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default ProductForm;
