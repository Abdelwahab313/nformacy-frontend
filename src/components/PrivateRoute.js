import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import authManager from '../services/authManager';
import { useLocation } from 'react-router';
import { RoutesPaths } from 'constants/routesPath';

function PrivateRoute({ component: Component, provider: Provider, ...rest }) {
  const location = useLocation();
  const isAdminLogin = location.pathname.indexOf('admin') > -1;
  const loginRoute = isAdminLogin
    ? RoutesPaths.Admin.Login
    : RoutesPaths.App.Login;

  const authToken = authManager.retrieveUserToken();
  const currentUser = authManager.retrieveCurrentUser();

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

  const shouldRedirectToVerifyEmail =
    !!currentUser &&
    !currentUser.isEmailVerified &&
    location.pathname !== RoutesPaths.App.EmailVerificationCallback &&
    location.pathname !== RoutesPaths.App.EmailVerificationPending;

  if (!!shouldRedirectToVerifyEmail) {
    return (
      <Route
        {...rest}
        render={() => (
          <Redirect
            to={{ pathname: RoutesPaths.App.EmailVerificationPending }}
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
