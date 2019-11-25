import React, { useEffect, useState } from 'react';
import ClientsList from './client/ClientsList';
import UsersList from './user/UsersList';
import ClientDetailsScreen from './client/detail/ClientDetailsScreen';
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
import SideBar from './drawer/SideBar';
import Logout from './user/LogoutUser';
import Layout from './Layout';

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
            setLoadedLocal,
          }}>
          <Switch>
            <Route path='/login' component={Login} />
            <PrivateRoute path='/' component={Layout} />
          </Switch>
        </AuthContext.Provider>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
