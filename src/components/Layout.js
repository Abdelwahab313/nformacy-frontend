import React from 'react';
import SideBar from './drawer/SideBar';
import PrivateRoute from './PrivateRoute';
import ClientsList from './client/ClientsList';
import { Switch, withRouter } from 'react-router-dom';
import Logout from '../auth/LogoutUser';
import ClientDetailsScreen from './client/detail/ClientDetailsScreen';
import SalesRepsPage from '../salesRep/SalesRepsPage';
import SalesList from './sales/SalesList';
import SaleDetails from './sales/SaleDetails';
import UserDetailsScreen from '../salesRep/userDetail/UserDetailsScreen';
import { makeStyles } from '@material-ui/core';
import ProductsListScreen from '../product/ProductsPage';
import { ProductProvider } from '../product/context/context';
import { SalesRepProvider } from '../salesRep/context';

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
          <PrivateRoute
            exact
            path='/'
            component={SalesRepsPage}
            provider={SalesRepProvider}
          />
          <PrivateRoute path='/clients/list' component={ClientsList} />
          <PrivateRoute path='/logout' component={Logout} />
          <PrivateRoute path='/clients/:uuid' component={ClientDetailsScreen} />
          <PrivateRoute
            path='/users/list'
            component={SalesRepsPage}
            provider={SalesRepProvider}
          />
          <PrivateRoute
            path='/users/:uuid'
            component={UserDetailsScreen}
            provider={SalesRepProvider}
          />
          <PrivateRoute path='/sales/list' component={SalesList} />
          <PrivateRoute path='/sales/:uuid' component={SaleDetails} />
          <PrivateRoute
            path='/products/list'
            component={ProductsListScreen}
            provider={ProductProvider}
          />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(Layout);
