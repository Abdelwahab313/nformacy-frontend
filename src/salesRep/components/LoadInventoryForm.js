import React from 'react';
import useForm from 'react-hook-form';
import {
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useProductState } from '../../product/context/context';
import useSalesRepFormStyle from '../styles/salesRepForm';
import { ADD_PRODUCT, REMOVE_PRODUCT } from '../context/contextAction';
import { useSalesRepState } from '../context';
import useLoadInventory from '../hooks/LoadInventory';

const LoadInventoryForm = ({ salesRep, closeForm }) => {
  const classes = useSalesRepFormStyle();
  const { register, handleSubmit, errors } = useForm();
  const [{ addedProducts }, dispatch] = useSalesRepState();
  const [{ products }] = useProductState();
  const { productsLoading, submit } = useLoadInventory({ salesRep, closeForm });

  const handleAddProduct = () => {
    return handleSubmit((data) => {
      dispatch({
        type: ADD_PRODUCT,
        payload: {
          selectedProduct: data.selectedProduct,
          productQuantity: data.productQuantity,
        },
      });
    });
  };

  if (productsLoading) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <Container component='main' maxWidth='md' dir={'rtl'}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            تحميل العربة
          </Typography>
          <Grid
            id={'loadInventoryForm'}
            container
            spacing={2}
            direction='row'
            alignItems='center'>
            <Grid item xs={6}>
              <InputLabel id='products-select-label' htmlFor='product'>
                المنتج
              </InputLabel>
              <Select
                inputRef={register({
                  required: 'برجاء اختيار المنتج',
                })}
                error={!!errors.product}
                native
                required
                className={classes.selectField}
                inputProps={{
                  name: 'selectedProduct',
                  id: 'product',
                }}>
                <option value='' />
                {products &&
                  products.map((product) => (
                    <option key={product[0]} value={product[0]}>
                      {product[1]}
                    </option>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={2}>
              <TextField
                name='productQuantity'
                id='productـquantity'
                label='الكميه'
                inputRef={register({
                  required: 'برجاء ادخال الكميه',
                  validate: (value) =>
                    (!isNaN(value) && value > 0) || 'الكميه يجب ان تكون رقم',
                })}
                error={!!errors.productQuantity}
                helperText={
                  errors.productQuantity && errors.productQuantity.message
                }
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                id={'load_inventory_add_btn'}
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                onClick={handleAddProduct()}
                className={classes.submit}>
                اضافه
              </Button>
            </Grid>
          </Grid>
          <Table
            id={'inventory-table'}
            className={classes.table}
            aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>المنتج</TableCell>
                <TableCell>الكميه</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addedProducts.map((addedProduct) => (
                <TableRow key={addedProduct.productUUID}>
                  <TableCell scope='row'>
                    {
                      products.find((product) => {
                        return product[0] === addedProduct.productUUID;
                      })[1]
                    }
                  </TableCell>
                  <TableCell>{addedProduct.quantity}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        dispatch({
                          type: REMOVE_PRODUCT,
                          payload: addedProduct.productUUID,
                        })
                      }
                      aria-label='close'>
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            id={'load_inventory_submit_btn'}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            onClick={submit}
            disabled={addedProducts.length === 0}
            className={classes.submit}>
            حفظ
          </Button>
        </div>
      </Container>
    );
  }
};

export default LoadInventoryForm;
