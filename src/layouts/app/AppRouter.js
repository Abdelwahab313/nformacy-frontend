import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';
import appRoutes from './routes';
import NotFoundPage from 'pages/NotFoundPage';
import AppLayout from './AppLayout';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';

const AppRouter = () => {
  return (
    <div>
      <ScrollToTop />
      <Switch>
        {appRoutes.map((route, key) => {
          const { Component, path, isPublic, includeLayout } = route;
          let Page;
          if (!!includeLayout) {
            Page = (props) => (
              <AppLayout>
                <Component {...props} />
              </AppLayout>
            );
          } else {
            Page = Component;
          }

          if (!!isPublic) {
            return <Route exact path={path} component={Page} key={key} />;
          }
          return <PrivateRoute exact path={path} component={Page} key={key} />;
        })}
        <Route path={'/'} component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default AppRouter;
