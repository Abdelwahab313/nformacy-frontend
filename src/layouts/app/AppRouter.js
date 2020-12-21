import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';
import appRoutes from './routes';
import NotFoundPage from 'pages/NotFoundPage';

const AppRouter = () => {
  return (
    <div>
      <Switch>
        {appRoutes.map((route, key) => {
          if (!!route.public) {
            return (
              <Route
                exact
                path={route.path}
                component={route.component}
                key={key}
              />
            );
          }
          return (
            <PrivateRoute
              exact
              path={route.path}
              component={route.component}
              key={key}
            />
          );
        })}
        <Route path={'/'} component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default AppRouter;
