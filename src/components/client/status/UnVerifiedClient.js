import { makeStyles } from '@material-ui/core';
import React from 'react';
import VerifyClient from './VerifyClient';

const UnVerifiedClient = ({ clientName, uuid, onStateChanged }) => {
  const useStyles = makeStyles(() => ({
    unVerifiedContainer: {
      color: '#FF0000',
    },
    unVerifiedLink: {
      color: '#2C87F0',
      fontWeight: 'bold',
      textDecoration: 'none',
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.unVerifiedContainer}>
      غير مُوثق
      <br />
      <VerifyClient
        clientName={clientName}
        uuid={uuid}
        onStateChanged={onStateChanged}
      />
    </div>
  );
};

export default UnVerifiedClient;
