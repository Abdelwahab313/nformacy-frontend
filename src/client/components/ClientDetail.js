import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import ClientStatus from './ClientStatus';
import { cloneDeep } from 'lodash';
import { Redirect } from 'react-router';
import { useClientState } from '../context';
import {
  UPDATE_CURRENT_CLIENT,
  VERIFY_CURRENT_CLIENT,
} from '../context/actionTypes';

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

const ClientDetails = () => {
  const classes = useStyles();
  const [{ currentClient }, dispatch] = useClientState();
  const [redirect, _] = useState(false);
  const [redirectTo, __] = useState();

  if (redirect) {
    return <Redirect push to={redirectTo} />;
  }

  return (
    <Paper className={classes.paper}>
      <p id={'title'}>تفاصيل العميل</p>
      <Table id={'client-info'}>
        <TableBody>
          <TableRow id={'clientName'}>
            <TableCell>أسم المكان</TableCell>
            <TableCell>{currentClient.name}</TableCell>
          </TableRow>
          <TableRow id={'ownerName'}>
            <TableCell>أسم المدير</TableCell>
            <TableCell>{currentClient.ownerName}</TableCell>
          </TableRow>
          <TableRow id={'address'}>
            <TableCell>العنوان</TableCell>
            <TableCell>{currentClient.address}</TableCell>
          </TableRow>
          <TableRow id={'phones'}>
            <TableCell>التليفون</TableCell>
            <TableCell>
              {currentClient.contacts
                ? currentClient.contacts.map((phone, index) => (
                    <div key={index}>
                      {' '}
                      {phone} <br />
                    </div>
                  ))
                : ''}
            </TableCell>
          </TableRow>
          <TableRow id={'status'}>
            <TableCell>الحاله</TableCell>
            <TableCell>
              <ClientStatus
                status={currentClient.verified}
                clientName={currentClient.name}
                onStateChange={() => dispatch({ type: VERIFY_CURRENT_CLIENT })}
                uuid={currentClient.uuid}
              />
            </TableCell>
          </TableRow>
          <TableRow id={'created'}>
            <TableCell>تاريخ الاضافه</TableCell>
            <TableCell>
              {`${new Date(
                currentClient.created,
              ).toLocaleTimeString()} ${new Date(
                currentClient.created,
              ).toLocaleDateString()}`}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ClientDetails;
