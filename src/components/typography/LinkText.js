import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const LinkText = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Link className={classes.link} {...props}>
      {children}
    </Link>
  );
};

const useStyles = makeStyles(() => ({
  link: { textDecoration: 'none' },
}));

export default LinkText;
