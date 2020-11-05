import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';

import adminRoutes from 'layouts/admin/routes';
import { RoutesPaths } from 'constants/routesPath';

const AdminRouter = () => {
  return (
    <Switch>
      {adminRoutes.map((route, key) => {
        return (
          <PrivateRoute
            exact
            path={route.path}
            component={route.component}
            key={key}
          />
        );
      })}
      <Redirect from={RoutesPaths.Admin.Home} to={RoutesPaths.Admin.Dashboard}/>
    </Switch>
  );
};

export default AdminRouter;