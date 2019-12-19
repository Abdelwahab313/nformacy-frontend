import React from 'react';
import { makeStyles } from '@material-ui/core';
import VerifyClient from './VerifyClient';

const useStyles = makeStyles(() => ({
  verified: {
    color: '#4CAF50',
  },
  unVerifiedContainer: {
    color: '#FF0000',
  },
  unVerifiedLink: {
    color: '#2C87F0',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
}));
const ClientStatus = ({ status, clientName, uuid, onStateChange }) => {
  const classes = useStyles();
  if (status) {
    return <p className={classes.verified}>مُوثق</p>;
  }
  return (
    <div className={classes.unVerifiedContainer}>
      غير مُوثق
      <br />
      <VerifyClient
        clientName={clientName}
        uuid={uuid}
        onStateChange={onStateChange}
      />
    </div>
  );
};

export default ClientStatus;
