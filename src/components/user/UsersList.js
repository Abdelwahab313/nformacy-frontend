import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Button,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import { fetchUsers } from '../../apis/usersApi';
import { table_localization } from '../../settings';
import CloseIcon from '@material-ui/icons/Close';
import AddUserForm from './addUserForm';
import '../../index.css';
import { useAuth } from '../../context/auth';
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
  progressContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const { authTokens, setAuthTokens } = useAuth();
  const [usersLoading, setUsersLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (createdUser) => {
    setOpen(false);
    if (createdUser.type !== 'click') {
      let tempUsers = _.cloneDeep(users);
      tempUsers.push(createdUser);
      setUsers(tempUsers);
    }
  };

  function getUsers() {
    setUsersLoading(true);
    return fetchUsers(authTokens)
      .then((res) => {
        const fetchedUsers = res.data;
        fetchedUsers.sort(
          (a, b) => new Date(a.date_joined) - new Date(b.date_joined),
        );
        setUsers(fetchedUsers);
      })
      .catch((reason) => {
        if (reason.response.status === 401) {
          localStorage.removeItem('tokens');
          localStorage.removeItem('users');
          setAuthTokens();
        }
      })
      .catch((reason) => {
        setErrorMessage('حدث خطأ أثناء الاتصال بالخادم');
        setShowError(true);
      });
  }

  useEffect(() => {
    getUsers().finally(() => {
      setUsersLoading(false);
    });
  }, []);
  if (usersLoading) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div dir='rtl' className={classes.root}>
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
            id={'add-user-button'}
            onClick={handleClickOpen}
            color='primary'>
            اضافه موظف جديد
          </Button>
          <MaterialTable
            id={'usersList'}
            localization={table_localization('موظفين')}
            columns={[
              {
                title: 'أسم المستخدم',
                field: 'name',
                render: (user) => {
                  return `${user.first_name} ${user.last_name}`;
                },
              },
              { title: 'رقم الموبايل', field: 'phone_number' },
              { title: 'رقم البطاقه', field: 'national_id' },
              { title: 'اسم تسجيل الدخول', field: 'username' },
              {
                title: 'تاريخ الاضافه',
                field: 'created',
                type: 'date',
                render: (user) => {
                  const date = new Date(user.date_joined);
                  return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
                },
              },
            ]}
            data={users}
            title={'المستخدمين'}
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
              <Typography>اضافه موظف جديد</Typography>
            </Toolbar>
          </AppBar>
          <AddUserForm onClose={handleClose} />
        </Dialog>
      </div>
    );
  }
}
