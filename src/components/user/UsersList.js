import React, { useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import MaterialTable from 'material-table';
import { fetchUsers } from '../../apis/usersApi';
import { table_localization } from '../../settings';
import AddUserForm from './addUserForm';

function UsersList(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers().then((res) => {
      const fetchedUsers = res.data;
      fetchedUsers.sort((a, b) => a.id - b.id);
      setUsers(fetchedUsers);
    });
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(3),
    },
  }));

  const classes = useStyles();

  return (
    <div dir='rtl' className={classes.root}>
      <Grid>
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
      <AddUserForm />
    </div>
  );
}

export default UsersList;
