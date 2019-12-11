import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import ErrorDialog from '../components/errors/ErrorDialog';
import AddProductPage from './AddProductPage';
import productsStyle from './styles/productsScreen';
import { useProductState } from './context/context';
import {
  CLOSE_INSERT_DIALOG_WITHOUT_SAVE,
  CLOSE_UPDATE_DIALOG_WITHOUT_SAVE,
  OPEN_INSERT_DIALOG,
  OPEN_UPDATE_DIALOG,
  SET_ERROR,
} from './context/contextActions';
import TableSelectedToolBar from './components/TableSelectedToolBar';
import useProductFetcher from './hooks/ProductFetcher';
import EditProductPage from './EditProductPage';
import { tableLabels } from '../constants/tableLocalization';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const ProductsPage = () => {
  const classes = productsStyle();
  const [
    { products, insertDialogOpened, updateDialogOpened, errorMessage },
    dispatch,
  ] = useProductState();
  const { productsLoading } = useProductFetcher();
  let selectedProduct = useRef(undefined);

  if (productsLoading) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className={classes.root} dir='rtl'>
        {errorMessage && (
          <ErrorDialog
            message={errorMessage}
            close={() => {
              dispatch({ type: SET_ERROR, payload: '' });
              dispatch({
                type: SET_ERROR,
                payload: '',
              });
            }}
          />
        )}
        <Grid className={classes.tableContainer}>
          <Button
            className={classes.addButton}
            variant='contained'
            id={'add-product-button'}
            onClick={() =>
              dispatch({ type: OPEN_INSERT_DIALOG, payload: true })
            }
            color='primary'>
            اضافه منتج جديد
          </Button>
          <MUIDataTable
            title={'البضائع'}
            data={products}
            columns={[
              {
                name: 'id',
                options: {
                  filter: false,
                  display: 'excluded',
                },
              },
              {
                name: 'اسم المنتج',
                options: {
                  filter: false,
                },
              },
              {
                name: 'SKU',
                options: {
                  filter: false,
                },
              },
              {
                name: 'سعر المنتج',
                options: {
                  filter: false,
                },
              },
            ]}
            options={{
              responsive: 'scrollMaxHeight',
              selectableRowsOnClick: true,
              selectableRows: 'single',
              filter: false,
              rowsPerPageOptions: [5, 10, 20],
              customToolbarSelect: (
                selectedRows,
                displayData,
                setSelectedRows,
              ) => {
                const selectedProductIndex = selectedRows.data[0].dataIndex;
                selectedProduct.current = products[selectedProductIndex];
                return (
                  <TableSelectedToolBar
                    onUpdate={() => dispatch({ type: OPEN_UPDATE_DIALOG })}
                  />
                );
              },
              ...tableLabels,
            }}
          />
        </Grid>
        <Dialog
          fullScreen
          open={insertDialogOpened}
          TransitionComponent={Transition}
          id={'add-user-dialog'}>
          <AppBar>
            <Toolbar className={classes.toolBar}>
              <IconButton
                edge='start'
                id={'close_insert_product_btn'}
                onClick={() =>
                  dispatch({
                    type: CLOSE_INSERT_DIALOG_WITHOUT_SAVE,
                  })
                }
                aria-label='close'>
                <CloseIcon />
              </IconButton>
              <Typography>اضافه منتج جديد</Typography>
            </Toolbar>
          </AppBar>
          <AddProductPage />
        </Dialog>
        <Dialog
          fullScreen
          open={updateDialogOpened}
          TransitionComponent={Transition}
          id={'add-user-dialog'}>
          <AppBar>
            <Toolbar className={classes.toolBar}>
              <IconButton
                edge='start'
                onClick={() =>
                  dispatch({
                    type: CLOSE_UPDATE_DIALOG_WITHOUT_SAVE,
                  })
                }
                aria-label='close'>
                <CloseIcon />
              </IconButton>
              <Typography>تعديل منتج</Typography>
            </Toolbar>
          </AppBar>
          <EditProductPage product={selectedProduct.current} />
        </Dialog>
      </div>
    );
  }
};

export default ProductsPage;
