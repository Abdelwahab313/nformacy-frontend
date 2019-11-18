import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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
import CloseIcon from '@material-ui/core/SvgIcon/SvgIcon';
import AddProductForm from './AddProductForm';

const useStyles = makeStyles((theme) => ({
  root: {
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
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    fetchProducts(authTokens)
      .then((res) => {
        const fetchedProducts = res.data;
        fetchedProducts.sort(
          (a, b) => new Date(a.created) - new Date(b.created),
        );
        setProducts(fetchedProducts);
      })
      .catch((reason) => {
        if (reason.message === 'Network Error') {
        } else if (reason.response.status === 401) {
          localStorage.removeItem('tokens');
          localStorage.removeItem('users');
          setAuthTokens();
        }
      })
      .finally(() => {});
  }, []);

  return (
    <div className={classes.root} dir='rtl'>
      <Grid container spacing={3} className={classes.details}>
        <Grid item lg={8} md={8} xs={12}>
          <Button
            className={classes.addButton}
            variant='contained'
            id={'add-product-button'}
            onClick={handleClickOpen}
            color='primary'>
            اضافه منتج جديد
          </Button>
          <Paper>
            <MaterialTable
              id={'productsList'}
              localization={table_localization('البضائع')}
              actions={[
                {
                  icon: 'help',
                  tooltip: 'تفاصيل المنتجات',
                  iconProps: {
                    color: 'primary',
                  },
                },
              ]}
              columns={[
                { title: 'اسم المنتج', field: 'name' },
                { title: 'SKU', field: 'sku' },
                { title: 'سعر المنتج', field: 'price' },
              ]}
              data={products}
              title={'المنتجات'}
            />
          </Paper>
        </Grid>
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
        <AddProductForm />
      </Dialog>
    </div>
  );
};

export default ProductsList;
