import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import MaterialTable from 'material-table';
import { fetchUsers } from '../../apis/usersApi';

function UsersList(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers().then((res) => {
      const fetchdeUsers = res.data;
      fetchdeUsers.sort((a, b) => a.id - b.id);
      setUsers(fetchdeUsers);
    });
  }, []);
  return (
    <div dir='rtl'>
      <Grid>
        <MaterialTable
          id={'usersList'}
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
    </div>
  );
}

export default UsersList;
