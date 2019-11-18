import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/auth';

function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens, loadedLocal } = useAuth();

  if (!authTokens && loadedLocal) {
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
  if (authTokens) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  // noinspection JSConstructorReturnsPrimitive
  return null;
}

export default PrivateRoute;
