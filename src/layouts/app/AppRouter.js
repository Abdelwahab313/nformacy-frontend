import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';

import appRoutes from './routes';

const AppRouter = () => {
  return (<Switch>
    {appRoutes.map((route, key) => {
      return (
        <PrivateRoute
          exact={route.exact}
          path={route.path}
          component={route.component}
          key={key}
        />
      );
    })}
  </Switch>);
};


export default AppRouter;
