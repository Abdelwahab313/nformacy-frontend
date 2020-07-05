import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Route, Switch, withRouter } from 'react-router-dom';
import SideBar from './drawer/SideBar';
import PrivateRoute from './PrivateRoute';
import HomePage from '../HomePage';
import MeetingsPage from '../MeetingsPage';
import EditMeetingPage from '../MeetingsPage/EditMeetingPage';
import EditProfile from '../EditProfile/EditProfile';
import FreeLancerProfileForm from '../FreelancerProfile/FreelancerProfileForm';
import Success from '../FreelancerProfile/success';

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
          <PrivateRoute path='/user/edit' component={EditProfile} />
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
