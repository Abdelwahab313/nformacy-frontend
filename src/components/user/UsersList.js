import React, { useEffect, useState } from 'react';
import {
  Grid,
  makeStyles,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Slide,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import { fetchUsers } from '../../apis/usersApi';
import { table_localization } from '../../settings';
import CloseIcon from '@material-ui/icons/Close';
import AddUserForm from './addUserForm';
import '../../index.css';
import { useAuth } from '../../context/auth';

function UsersList(props) {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const { authTokens, setAuthTokens } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    fetchUsers(authTokens)
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
      });
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(3),
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
  }));
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
  });

  const classes = useStyles();

  return (
    <div dir='rtl' className={classes.root}>
      <Grid>
        <Button
          variant='contained'
          id={'add-user-button'}
          onClick={handleClickOpen}
          color='primary'>
          اضافه موظف جديد
        </Button>
        <MaterialTable
          id={'usersList'}
          localization={table_localization(false)}
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
        <AddUserForm />
      </Dialog>
    </div>
  );
}

export default UsersList;
