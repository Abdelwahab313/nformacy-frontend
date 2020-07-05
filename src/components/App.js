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
import EditProfile from '../EditProfile/EditProfile';
import authManager from '../services/authManager';
import Logout from '../auth/LogoutUser';
import FreeLancerProfileForm from '../FreelancerProfile/FreelancerProfileForm';
import Success from '../FreelancerProfile/success';

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
    const user = localStorage.getItem('user');
    setLoggedInUser(user);
    setLoadedLocal(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <AuthContext.Provider
          value={{
            loggedInUser,
            loadedLocal,
            setLoggedInUser: setLoggedUser,
            setLoadedLocal,
          }}>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Register} />
            <Route path='/logout' component={Logout} />
            <PrivateRoute
              path='/user/profile'
              component={FreeLancerProfileForm}
            />
            <PrivateRoute path='/user/success' component={Success} />
            <PrivateRoute path='/' component={Layout} />
          </Switch>
        </AuthContext.Provider>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
