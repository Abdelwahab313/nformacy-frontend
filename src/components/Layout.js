import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import { Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import HomePage from '../pages/Home';
import MeetingsPage from '../pages/Meeting';
import MeetingDetailsPage from '../pages/Meeting/MeetingDetailsPage';
import EditProfile from '../pages/Profile/Profile';
import MainHeader from './header/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
}));

function Layout() {
  const classes = useStyles();
  return (
    <Fragment>
      <MainHeader/>
      <div className={classes.root}>
        <Switch>
          <PrivateRoute exact path='/' component={HomePage}/>
          <PrivateRoute path='/user/edit' component={EditProfile}/>
          <PrivateRoute exact path='/meeting/list' component={MeetingsPage}/>
          <PrivateRoute
            exact
            path='/meeting/edit'
            component={MeetingDetailsPage}
          />
        </Switch>
      </div>
    </Fragment>
  );
}

export default withRouter(Layout);
