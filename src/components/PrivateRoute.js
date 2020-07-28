import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import authManager from '../services/authManager';
import { useLocation } from 'react-router';
import { RoutesPaths } from 'constants/routesPath';

function PrivateRoute({ component: Component, provider: Provider, ...rest }) {
  const location = useLocation();
  const isAdminLogin = location.pathname.indexOf('admin') > -1;
  const loginRoute = isAdminLogin ? RoutesPaths.Admin.Login : RoutesPaths.App.Login;

  const { authToken } = authManager.retrieveUserToken();
  if (!authToken) {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Redirect
            to={{ pathname: loginRoute, state: { referer: props.location } }}
          />
        )}
      />
    );
  }
  if (authToken) {
    return (
      <Route
        {...rest}
        render={(props) =>
          Provider ? (
            <Provider>
              <Component {...props} />
            </Provider>
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  }
  // noinspection JSConstructorReturnsPrimitive
  return null;
}

export default PrivateRoute;
