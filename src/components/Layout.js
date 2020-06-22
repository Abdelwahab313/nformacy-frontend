import React from 'react';
import SideBar from './drawer/SideBar';
import PrivateRoute from './PrivateRoute';
import { Switch, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import HomePage from '../HomePage';
import MeetingPage from '../MeetingsPage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  sideBarContainer: {
    width: '15%',
    height: '100%',
  },
  AppContainer: {
    width: '80%',
    height: '100%',
  },
}));

function Layout(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.sideBarContainer}>
        <SideBar />
      </div>
      <div className={classes.AppContainer}>
        <Switch>
          <PrivateRoute exact path='/' component={HomePage} />
          <PrivateRoute exact path='/meeting/list' component={MeetingPage} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(Layout);
