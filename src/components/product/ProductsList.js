import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  makeStyles,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { table_localization } from '../../settings';
import MaterialTable from 'material-table';
import { fetchProducts } from '../../apis/productsApi';
import { useAuth } from '../../context/auth';
import CloseIcon from '@material-ui/icons/Close';
import AddProductForm from './AddProductForm';
import ErrorDialog from '../errors/ErrorDialog';
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#F5F5F5',
    padding: theme.spacing(3),
  },
  addButton: {
    marginBottom: theme.spacing(1),
  },
  toolBar: {
    position: 'relative',
    color: '#edf0f2',
    justifyContent: 'space-between',
    flexBasis: '100%',
  },
  addForm: {
    margin: 'auto',
  },
  tableContainer: {
    width: '85%',
    margin: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
const ProductsList = (props) => {
  const [products, setProducts] = useState([]);
  const { authTokens, setAuthTokens } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (insertedProduct) => {
    setOpen(false);
    if (insertedProduct.type !== 'click') {
      let tempProducts = _.cloneDeep(products);
      tempProducts.push(insertedProduct);
      setProducts(tempProducts);
    }
  };

  function getProducts() {
    setProductsLoading(true);
    return fetchProducts(authTokens)
      .then((res) => {
        const fetchedProducts = res.data;
        fetchedProducts.sort(
          (a, b) => new Date(a.created) - new Date(b.created),
        );
        setProducts(fetchedProducts);
      })
      .catch((reason) => {
        if (reason.message === 'Network Error') {
          setErrorMessage('حدث خطأ أثناء الاتصال بالخادم');
          setShowError(true);
        } else if (reason.response.status === 401) {
          localStorage.removeItem('tokens');
          localStorage.removeItem('users');
          setAuthTokens();
        }
      });
  }

  useEffect(() => {
    getProducts().finally(() => {
      setProductsLoading(false);
    });
  }, []);
  if (productsLoading) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className={classes.root} dir='rtl'>
        {showError && (
          <ErrorDialog
            message={errorMessage}
            close={() => {
              setShowError(false);
              setErrorMessage();
            }}
          />
        )}
        <Grid className={classes.tableContainer}>
          <Button
            className={classes.addButton}
            variant='contained'
            id={'add-product-button'}
            onClick={handleClickOpen}
            color='primary'>
            اضافه منتج جديد
          </Button>
          <MaterialTable
            id={'productsList'}
            localization={table_localization('بضائع')}
            columns={[
              { title: 'اسم المنتج', field: 'name' },
              { title: 'SKU', field: 'sku' },
              { title: 'سعر المنتج', field: 'price' },
            ]}
            data={products}
            title={'المنتجات'}
          />
        </Grid>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          id={'add-user-dialog'}>
          <AppBar>
            <Toolbar className={classes.toolBar}>
              <IconButton edge='start' onClick={handleClose} aria-label='close'>
                <CloseIcon />
              </IconButton>
              <Typography>اضافه منتج جديد</Typography>
            </Toolbar>
          </AppBar>
          <AddProductForm onClose={handleClose} />
        </Dialog>
      </div>
    );
  }
};

export default ProductsList;
