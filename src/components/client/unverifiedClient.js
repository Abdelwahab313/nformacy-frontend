import { makeStyles } from '@material-ui/core';
import React from 'react';
import VerifyClient from './verifyClient';

const UnVerifiedClient = (props) => {
  debugger;
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
    <p className={classes.unVerifiedContainer}>
      غير مُوثق
      <br />
      <VerifyClient clientName={props.clientName} />
    </p>
  );
};

export default UnVerifiedClient;
