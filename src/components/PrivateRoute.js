import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import authManager from '../services/authManager';
import { useLocation } from 'react-router';
import { RoutesPaths } from 'constants/routesPath';
import { NotificationsProvider } from '../hooks/notifications/context';

function PrivateRoute({ component: Component, provider: Provider, ...rest }) {
  const location = useLocation();
  const isAdminLogin = location.pathname.indexOf('admin') > -1;
  const loginRoute = isAdminLogin
    ? RoutesPaths.Admin.Login
    : RoutesPaths.App.Login;

  const { authToken, user } = authManager.retrieveUserToken();
  const WithNotifications = ({ children }) => (
    <NotificationsProvider
      initialNotifications={user?.notifications}
      unreadCount={user?.unreadNotifications}>
      {children}
    </NotificationsProvider>
  );
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
              <WithNotifications>
                <Component {...props} />
              </WithNotifications>
            </Provider>
          ) : (
            <WithNotifications>
              <Component {...props} />
            </WithNotifications>
          )
        }
      />
    );
  }
  // noinspection JSConstructorReturnsPrimitive
  return null;
}

export default PrivateRoute;
