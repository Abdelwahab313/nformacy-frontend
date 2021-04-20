import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RoutesPaths } from 'constants/routesPath';
import AppRouter from './app/AppRouter';

import PrivateRoute from 'components/PrivateRoute';
const AdminLayout = React.lazy(() => import('layouts/admin/AdminLayout'));
const Login = React.lazy(() => import('pages/auth/LoginUser'));

const MainRouter = () => {
  return (
    <Switch>
      <Route path={RoutesPaths.Admin.Login} component={Login} />
      <PrivateRoute path={RoutesPaths.Admin.Home} component={AdminLayout} />

      <Route path={'/'} component={AppRouter} />
    </Switch>
  );
};

export default MainRouter;
