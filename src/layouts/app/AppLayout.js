import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import AppHeader from 'components/Header/app/Header';

import AppRouter from 'layouts/app/AppRouter';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
}));

function AppLayout() {
  const classes = useStyles();
  return (
    <Fragment>
      <AppHeader/>
      <div className={classes.root}>
        <AppRouter/>
      </div>
    </Fragment>
  );
}

export default withRouter(AppLayout);
