import React from 'react';
import LargeSideBar from './drawer/LargeSideBar';
import PrivateRoute from './PrivateRoute';
import ClientsList from './client/ClientsList';
import { Switch, withRouter } from 'react-router-dom';
import Logout from './user/LogoutUser';
import Client from './client/detail/Client';
import UsersList from './user/UsersList';

function Layout(props) {
  return (
    <div>
      <LargeSideBar />
      <Switch>
        <PrivateRoute exact path='/' component={ClientsList} />
        <PrivateRoute path='/clients/list' component={ClientsList} />
        <PrivateRoute path='/logout' component={Logout} />
        <PrivateRoute path='/clients/:uuid' component={Client} />
        <PrivateRoute path='/users/list' component={UsersList} />
      </Switch>
    </div>
  );
}

export default withRouter(Layout);
