import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import ClientStatus from '../status/ClientStatus';
import { cloneDeep } from 'lodash';
import Button from '@material-ui/core/Button';
import DeleteClient from '../DeleteClient';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
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
  const [showDelete, setShowDelete] = useState(false);
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
  function handleOnDeleteSuccess(id) {
    setShowDelete(false);
    setRedirectTo('/clients/list');
    setRedirect(true);
  }
  function handleOnDeleteFail() {
    setShowDelete(false);
  }
  function handleOpenDelete() {
    setShowDelete(true);
  }

  if (redirect) {
    return <Redirect push to={redirectTo} />;
  }

  return (
    <Paper className={classes.paper}>
      {showDelete && (
        <DeleteClient
          clientName={client.name}
          onDeleteDone={handleOnDeleteSuccess}
          onDeleteFail={handleOnDeleteFail}
          identifier={Date.now()}
          uuid={client.uuid}
        />
      )}
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
          <TableRow id={'operations'}>
            <TableCell>عمليات</TableCell>
            <TableCell>
              <Button
                variant='contained'
                color='secondary'
                className={classes.button}
                onClick={handleOpenDelete}>
                حذف العميل
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ClientDetails;
