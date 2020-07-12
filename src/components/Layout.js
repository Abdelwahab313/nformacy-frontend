import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Route, Switch, withRouter } from 'react-router-dom';
import SideBar from './drawer/SideBar';
import PrivateRoute from './PrivateRoute';
import HomePage from '../pages/Home';
import MeetingsPage from '../pages/Meeting';
import MeetingDetailsPage from '../pages/Meeting/MeetingDetailsPage';
import EditProfile from '../pages/EditProfile/EditProfile';
import FreeLancerProfileForm from '../pages/FreelancerProfile/FreelancerProfileForm';
import Success from '../pages/FreelancerProfile/success';

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
            component={MeetingDetailsPage}
          />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(Layout);
