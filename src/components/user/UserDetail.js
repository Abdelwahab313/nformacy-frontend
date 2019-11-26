import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#F5F5F5',
    padding: theme.spacing(1),
  },
  mapContainer: {
    padding: theme.spacing(2),
  },
  mapGrid: {
    width: '100%',
    marginRight: theme.spacing(3),
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  details: {
    padding: theme.spacing(2),
  },
  img: {
    height: '100%',
    minHeight: '400px',
    maxHeight: 515,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
  emptyContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  largeIcon: {
    width: 40,
    height: 40,
    color: 'red',
  },
  notFound: {
    color: 'red',
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
      <p id={'title'}>تفاصيل المندوب</p>
      <Table id={'user-info'}>
        <TableBody>
          <TableRow id={'repName'}>
            <TableCell>أسم المندوب</TableCell>
            <TableCell>{user.first_name + ' ' + user.last_name}</TableCell>
          </TableRow>
          <TableRow id={'phone'}>
            <TableCell>رقم الموبايل</TableCell>
            <TableCell>{user.phone_number}</TableCell>
          </TableRow>
          <TableRow id={'nationalid'}>
            <TableCell>التليفون</TableCell>
            <TableCell>{user.national_id}</TableCell>
          </TableRow>
          <TableRow id={'username'}>
            <TableCell>أسم تسجيل الدخول</TableCell>
            <TableCell>{user.username}</TableCell>
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
