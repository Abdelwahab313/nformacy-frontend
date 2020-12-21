import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core';

import AppHeader from 'components/header/app/Header';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
}));

function AppLayout(Component) {
  const classes = useStyles();
  return (
    <Fragment>
      <AppHeader />
      <div className={classes.root}>
        <Component />
      </div>
    </Fragment>
  );
}

export default AppLayout;
