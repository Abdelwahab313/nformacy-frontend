import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const LandingPageContainer = ({ className, children, ...props }) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, className)} justify='center' {...props}>
      {children}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: [theme.spacing(8), theme.spacing(4)],
  },
}));

export default LandingPageContainer;
