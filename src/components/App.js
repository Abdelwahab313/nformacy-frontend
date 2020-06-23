import React, { useEffect, useState } from 'react';
import {
  createMuiTheme,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/core/styles';
import { create } from 'jss';
import preset from 'jss-preset-default';
import rtl from 'jss-rtl';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/LoginUser';
import { AuthContext } from '../auth/auth';
import PrivateRoute from './PrivateRoute';
import Layout from './Layout';
import Register from '../Register/Register';
import authManager from '../services/authManager';
import Logout from '../auth/LogoutUser';

const presets = preset().plugins;

const jss = create({ plugins: [...presets, rtl()] });

const theme = createMuiTheme({
  direction: 'ltr', // Both here and <body dir="rtl">
});

function App() {
  const [loggedInUser, setLoggedInUser] = useState();
  const [loadedLocal, setLoadedLocal] = useState(false);

  const setLoggedUser = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setLoggedInUser(data);
  };

  useEffect(() => {
    const retrievedToken = authManager.retrieveUserToken();
    setLoadedLocal(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <AuthContext.Provider
          value={{
            loadedLocal,
            setLoggedInUser: setLoggedUser,
            setLoadedLocal,
          }}>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Register} />
            <Route path='/logout' component={Logout} />
            <PrivateRoute path='/' component={Layout} />
          </Switch>
        </AuthContext.Provider>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
