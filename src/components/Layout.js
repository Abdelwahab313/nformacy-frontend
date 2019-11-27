import React from 'react';
import SideBar from './drawer/SideBar';
import PrivateRoute from './PrivateRoute';
import ClientsList from './client/ClientsList';
import { Switch, withRouter } from 'react-router-dom';
import Logout from './user/LogoutUser';
import ClientDetailsScreen from './client/detail/ClientDetailsScreen';
import UsersList from './user/UsersList';
import ProductsList from './product/ProductsList';
import SalesList from './sales/SalesList';
import SaleDetails from './sales/SaleDetails';
import UserDetailsScreen from './user/userDetail/UserDetailsScreen';
import { makeStyles } from '@material-ui/core';

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
    width: '100%',
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
          <PrivateRoute exact path='/' component={UsersList} />
          <PrivateRoute path='/clients/list' component={ClientsList} />
          <PrivateRoute path='/logout' component={Logout} />
          <PrivateRoute path='/clients/:uuid' component={ClientDetailsScreen} />
          <PrivateRoute path='/users/list' component={UsersList} />
          <PrivateRoute path='/users/:uuid' component={UserDetailsScreen} />
          <PrivateRoute path='/products/list' component={ProductsList} />
          <PrivateRoute path='/sales/list' component={SalesList} />
          <PrivateRoute path='/sales/:uuid' component={SaleDetails} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(Layout);
