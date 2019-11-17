import React, { useEffect, useState } from 'react';
import ClientsList from './client/ClientsList';
import UsersList from './user/UsersList';
import Client from './client/detail/Client';
import {
  createMuiTheme,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/core/styles';

import { create } from 'jss';
import preset from 'jss-preset-default';
import rtl from 'jss-rtl';
import { Route, Switch } from 'react-router-dom';
import Login from './user/LoginUser';
import { AuthContext } from '../context/auth';
import PrivateRoute from './PrivateRoute';

const presets = preset().plugins;

const jss = create({ plugins: [...presets, rtl()] });

const theme = createMuiTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});

function App() {
  const [authTokens, setAuthTokens] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  const [loadedLocal, setLoadedLocal] = useState(false);

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  const setLoggedUser = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setLoggedInUser(data);
  };

  useEffect(() => {
    const loadedTokenString = localStorage.getItem('tokens');
    let loadedToken = undefined;
    try {
      loadedToken = loadedTokenString
        ? JSON.parse(loadedTokenString)
        : undefined;
    } catch (e) {}
    setAuthTokens(loadedToken);
    setLoadedLocal(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <AuthContext.Provider
          value={{
            authTokens,
            setAuthTokens: setTokens,
            loadedLocal,
            setLoggedInUser: setLoggedUser,
          }}>
          <Switch>
            <PrivateRoute exact path='/' component={ClientsList} />
            <PrivateRoute path='/clients/list' component={ClientsList} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/clients/:uuid' component={Client} />
            <PrivateRoute path='/users/list' component={UsersList} />
          </Switch>
        </AuthContext.Provider>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
