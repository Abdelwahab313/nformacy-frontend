import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const LinkText = ({ children, to, ...props }) => {
  const classes = useStyles();
  const hasLinkProp = !!to;

  
  if (!hasLinkProp) {
    return <>{children}</>;
  }
  return (
    <Link className={classes.link} to={to} {...props}>
      {children}
    </Link>
  );
};

const useStyles = makeStyles(() => ({
  link: { textDecoration: 'none' },
}));

export default LinkText;
