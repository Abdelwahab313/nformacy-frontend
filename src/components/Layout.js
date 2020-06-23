import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Switch, withRouter } from 'react-router-dom';
import SideBar from './drawer/SideBar';
import PrivateRoute from './PrivateRoute';
import HomePage from '../HomePage';
import MeetingsPage from '../MeetingsPage';
import EditMeetingPage from '../MeetingsPage/EditMeetingPage';

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
          <PrivateRoute exact path='/meeting/list' component={MeetingsPage} />
          <PrivateRoute
            exact
            path='/meeting/edit'
            component={EditMeetingPage}
          />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(Layout);
