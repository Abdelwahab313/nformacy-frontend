import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import ClientStatus from '../status/ClientStatus';
import { cloneDeep } from 'lodash';
import { Redirect } from 'react-router';

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

const ClientDetails = ({ passedClient }) => {
  const classes = useStyles();
  const [client, setClient] = useState(passedClient);
  const [redirect, setRedirect] = useState(false);
  const [redirectTo, setRedirectTo] = useState();
  useEffect(() => {
    setClient(passedClient);
  }, [passedClient]);

  function handleOnStateChanged(id) {
    const tempClientState = cloneDeep(client);
    tempClientState.verified = true;
    setClient(tempClientState);
  }

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
          <TableRow id={'status'}>
            <TableCell>الحاله</TableCell>
            <TableCell>
              <ClientStatus
                status={client.verified}
                clientName={client.name}
                onStateChanged={handleOnStateChanged}
                uuid={client.uuid}
              />
            </TableCell>
          </TableRow>
          <TableRow id={'created'}>
            <TableCell>تاريخ الاضافه</TableCell>
            <TableCell>
              {`${new Date(client.created).toLocaleTimeString()} ${new Date(
                client.created,
              ).toLocaleDateString()}`}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ClientDetails;
