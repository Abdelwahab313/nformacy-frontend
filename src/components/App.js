import React, { useState } from 'react';
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
import { clients } from '../data';
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

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
          <Switch>
            <PrivateRoute exact path='/' component={ClientsList} />
            <PrivateRoute path='/clients/list' component={ClientsList} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/clients/:uuid' component={Client} />
          </Switch>
        </AuthContext.Provider>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
