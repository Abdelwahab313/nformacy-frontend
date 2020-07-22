import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import authManager from '../services/authManager';

function PrivateRoute({ component: Component, provider: Provider, ...rest }) {
  const { authToken } = authManager.retrieveUserToken();
  if (!authToken) {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Redirect
            to={{ pathname: '/login', state: { referer: props.location } }}
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
