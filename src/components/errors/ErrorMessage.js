import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const ErrorMessage = ({ errorField, className }) => {
  const classes = useStyles();

  if (!!errorField) {
    return (
      <span className={clsx(classes.errorSpan, className)}>
        {errorField.message}
      </span>
    );
  } else {
    return null;
  }
};

const useStyles = makeStyles(() => ({
  errorSpan: {
    color: 'red',
    display: 'inline-block',
  },
}));

export default ErrorMessage;
