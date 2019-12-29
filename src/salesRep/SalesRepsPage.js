import React, { useRef, useState } from 'react';
import {
  AppBar,
  Button,
  Dialog,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddSalesRepForm from './AddSalesRepForm';
import '../index.css';
import ErrorDialog from '../components/errors/ErrorDialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router';
import useSalesRepsFetcher from './hooks/SalesRepsFetcher';
import { useSalesRepState } from './context';
import {
  SET_ERROR_MESSAGE,
  SET_INSERT_DIALOG_OPEN,
  SET_UPDATE_DIALOG_OPEN,
} from './context/contextAction';
import useSalesRepsStyle from './styles/salesRepsPage';
import MUIDataTable from 'mui-datatables';
import TableSelectedToolBar from './components/TableSelectedToolBar';
import { tableLabels } from '../constants/tableLocalization';
import EditSalesRepForm from './EditSalesRepForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import LoadInventoryForm from './components/LoadInventoryForm';
import { ProductProvider } from '../product/context/context';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const SalesRepsPage = () => {
  const classes = useSalesRepsStyle();
  const { usersLoading } = useSalesRepsFetcher();
  const [redirect, setRedirect] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isLoadInventoryOpen, setIsLoadInventoryOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState();
  let selectedSalesRep = useRef(undefined);
  const [
    { users, isInsertDialogOpen, isUpdateDialogOpen, errorMessage },
    dispatch,
  ] = useSalesRepState();

  if (redirect) {
    return <Redirect push to={redirectTo} />;
  } else if (usersLoading) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div dir='rtl' className={classes.root}>
        {errorMessage && (
          <ErrorDialog
            message={errorMessage}
            close={() => dispatch({ type: SET_ERROR_MESSAGE, payload: '' })}
          />
        )}
        <Grid className={classes.tableContainer}>
          <Button
            className={classes.addButton}
            variant='contained'
            id={'add-sales-rep-button'}
            onClick={() =>
              dispatch({ type: SET_INSERT_DIALOG_OPEN, payload: true })
            }
            color='primary'>
            اضافه موظف جديد
          </Button>
          <MUIDataTable
            title={'المستخدمين'}
            data={users}
            columns={[
              {
                name: 'id',
                options: {
                  filter: false,
                  display: 'excluded',
                },
              },
              {
                name: 'first_name',
                options: {
                  filter: false,
                  display: 'excluded',
                },
              },
              {
                name: 'last_name',
                options: {
                  filter: false,
                  display: 'excluded',
                },
              },
              {
                name: 'أسم المستخدم',
                options: {
                  filter: false,
                },
              },
              {
                name: 'رقم الموبايل',
                options: {
                  filter: false,
                },
              },
              {
                name: 'رقم البطاقه',
                options: {
                  filter: false,
                },
              },
              {
                name: 'اسم تسجيل الدخول',
                options: {
                  filter: false,
                },
              },
              {
                name: 'تاريخ الاضافه',
                options: {
                  filter: false,
                  customBodyRender: (value, tableMeta, updateValue) => {
                    const date = new Date(value);
                    return (
                      <p>{`${date.toLocaleString('en-GB', {
                        hour12: true,
                      })}`}</p>
                    );
                  },
                },
              },
              {
                name: 'password',
                options: {
                  filter: false,
                  display: 'excluded',
                },
              },
            ]}
            options={{
              selectableRowsOnClick: true,
              selectableRows: 'single',
              responsive: 'scrollMaxHeight',
              filter: false,
              rowsPerPageOptions: [5, 10, 20],
              customToolbarSelect: (
                selectedRows,
                displayData,
                setSelectedRows,
              ) => {
                const selectedUserIndex = selectedRows.data[0].dataIndex;
                selectedSalesRep.current = users[selectedUserIndex];
                return (
                  <TableSelectedToolBar
                    onView={() => {
                      setRedirectTo(`${selectedSalesRep.current[0]}`);
                      setRedirect(true);
                    }}
                    onUpdate={() =>
                      dispatch({ type: SET_UPDATE_DIALOG_OPEN, payload: true })
                    }
                    onResetPassword={() => setIsResetPasswordOpen(true)}
                    onLoadInventory={() => setIsLoadInventoryOpen(true)}
                  />
                );
              },
              ...tableLabels,
            }}
          />
        </Grid>
        <Dialog
          fullScreen
          open={isInsertDialogOpen}
          TransitionComponent={Transition}
          id={'add-user-dialog'}>
          <AppBar>
            <Toolbar className={classes.toolBar}>
              <IconButton
                edge='start'
                id={'close-sales-rep-form-btn'}
                onClick={() =>
                  dispatch({ type: SET_INSERT_DIALOG_OPEN, payload: false })
                }
                aria-label='close'>
                <CloseIcon />
              </IconButton>
              <Typography>اضافه موظف جديد</Typography>
            </Toolbar>
          </AppBar>
          <AddSalesRepForm />
        </Dialog>
        <Dialog
          fullScreen
          open={isLoadInventoryOpen}
          TransitionComponent={Transition}
          id={'load-inventory-dialog'}>
          <AppBar>
            <Toolbar className={classes.toolBar}>
              <IconButton
                edge='start'
                id={'load-inventory-form-btn'}
                onClick={() => setIsLoadInventoryOpen(false)}
                aria-label='close'>
                <CloseIcon />
              </IconButton>
              <Typography>تحميل العربه</Typography>
            </Toolbar>
          </AppBar>
          <ProductProvider>
            <LoadInventoryForm
              salesRep={selectedSalesRep.current}
              closeForm={() => setIsLoadInventoryOpen(false)}
            />
          </ProductProvider>
        </Dialog>
        <Dialog
          open={isResetPasswordOpen}
          TransitionComponent={Transition}
          id={'reset-password-dialog'}>
          <AppBar>
            <Toolbar className={classes.toolBar}>
              <IconButton
                edge='start'
                id={'reset-password-form-btn'}
                onClick={() => setIsResetPasswordOpen(false)}
                aria-label='close'>
                <CloseIcon />
              </IconButton>
              <Typography>إعادة تعيين كلمة المرور</Typography>
            </Toolbar>
          </AppBar>
          <ResetPasswordForm
            salesRep={selectedSalesRep.current}
            closeForm={() => setIsResetPasswordOpen(false)}
          />
        </Dialog>
        <Dialog
          fullScreen
          open={isUpdateDialogOpen}
          TransitionComponent={Transition}
          id={'add-user-dialog'}>
          <AppBar>
            <Toolbar className={classes.toolBar}>
              <IconButton
                edge='start'
                onClick={() =>
                  dispatch({ type: SET_UPDATE_DIALOG_OPEN, payload: false })
                }
                aria-label='close'>
                <CloseIcon />
              </IconButton>
              <Typography>تعديل موظف</Typography>
            </Toolbar>
          </AppBar>
          <EditSalesRepForm salesRep={selectedSalesRep.current} />
        </Dialog>
      </div>
    );
  }
};

export default SalesRepsPage;
