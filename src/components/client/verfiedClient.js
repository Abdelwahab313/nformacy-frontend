import { makeStyles } from '@material-ui/core';
import React from 'react';

const VerifiedClient = (props) => {
  const useStyles = makeStyles(() => ({
    verified: {
      color: '#4CAF50',
    },
  }));
  const classes = useStyles();
  return <p className={classes.verified}>مُوثق</p>;
};

export default VerifiedClient;
