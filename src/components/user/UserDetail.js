import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    minWidth: '340px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const UserDetails = ({ passedUser }) => {
  const classes = useStyles();
  const [user, setUser] = useState(passedUser);
  useEffect(() => {
    setUser(passedUser);
  }, [passedUser]);

  return (
    <Paper className={classes.paper}>
      <p id={'title'}>تفاصيل العميل</p>
      <Table id={'user-info'}>
        <TableBody>
          <TableRow id={'userName'}>
            <TableCell>أسم المكان</TableCell>
            <TableCell>{user.name}</TableCell>
          </TableRow>
          <TableRow id={'ownerName'}>
            <TableCell>أسم المدير</TableCell>
            <TableCell>{user.ownerName}</TableCell>
          </TableRow>
          <TableRow id={'address'}>
            <TableCell>العنوان</TableCell>
            <TableCell>{user.address}</TableCell>
          </TableRow>
          <TableRow id={'phones'}>
            <TableCell>التليفون</TableCell>
            <TableCell>
              {user.contacts
                ? user.contacts.map((phone, index) => (
                    <div key={index}>
                      {' '}
                      {phone} <br />
                    </div>
                  ))
                : ''}
            </TableCell>
          </TableRow>
          <TableRow id={'created'}>
            <TableCell>تاريخ الاضافه</TableCell>
            <TableCell>
              {`${new Date(user.date_joined).toLocaleTimeString()} ${new Date(
                user.date_joined,
              ).toLocaleDateString()}`}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UserDetails;
