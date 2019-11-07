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
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const ClientDetails = ({ passedClient }) => {
  const classes = useStyles();
  const [client, setClient] = useState(passedClient);
  useEffect(() => {
    setClient(passedClient);
  }, [passedClient]);
  return (
    <Paper className={classes.paper}>
      <p id={'title'}>تفاصيل العميل</p>
      <Table id={'client-info'}>
        <TableBody>
          <TableRow id={'clientName'}>
            <TableCell>أسم المكان</TableCell>
            <TableCell>{client.name}</TableCell>
          </TableRow>
          <TableRow id={'ownerName'}>
            <TableCell>أسم المدير</TableCell>
            <TableCell>{client.ownerName}</TableCell>
          </TableRow>
          <TableRow id={'address'}>
            <TableCell>العنوان</TableCell>
            <TableCell>{client.address}</TableCell>
          </TableRow>
          <TableRow id={'phones'}>
            <TableCell>التليفون</TableCell>
            <TableCell>
              {client.contacts
                ? client.contacts.map((phone, index) => (
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
            <TableCell>{client.created}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ClientDetails;
