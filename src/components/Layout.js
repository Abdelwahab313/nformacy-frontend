import React from 'react';
import SideBar from './drawer/SideBar';
import PrivateRoute from './PrivateRoute';
import ClientsList from './client/ClientsList';
import { Switch, withRouter } from 'react-router-dom';
import Logout from './user/LogoutUser';
import Client from './client/detail/Client';
import UsersList from './user/UsersList';
import ProductsList from './product/ProductsList';
import SalesList from './sales/SalesList';

function Layout(props) {
  return (
    <div>
      <SideBar />
      <Switch>
        <PrivateRoute exact path='/' component={UsersList} />
        <PrivateRoute path='/clients/list' component={ClientsList} />
        <PrivateRoute path='/logout' component={Logout} />
        <PrivateRoute path='/clients/:uuid' component={Client} />
        <PrivateRoute path='/users/list' component={UsersList} />
        <PrivateRoute path='/products/list' component={ProductsList} />
        <PrivateRoute path='/sales/list' component={SalesList} />
      </Switch>
    </div>
  );
}

export default withRouter(Layout);
