import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import adminRoutes from 'layouts/admin/routes';
import { RoutesPaths } from 'constants/routesPath';

const AdminRouter = () => {
  return (
    <Switch>
      {adminRoutes.map((prop, key) => {
        if (prop.layout === '/admin') {
          return (
            <Route
              exact
              path={prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
        return null;
      })}
      <Redirect from={RoutesPaths.Admin.Home} to={RoutesPaths.Admin.Dashboard}/>
    </Switch>
  );
};

export default AdminRouter;