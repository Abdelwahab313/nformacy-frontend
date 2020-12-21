import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RoutesPaths } from 'constants/routesPath';
import Login from 'pages/auth/LoginUser';

import PrivateRoute from 'components/PrivateRoute';
import AdminLayout from 'layouts/admin/AdminLayout';
// import AppBlankRouter from './app/AppBlankRouter';
import AppRouter from './app/AppRouter';

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
