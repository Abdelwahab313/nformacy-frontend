import React, { useEffect, useState } from 'react';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import preset from 'jss-preset-default';
import rtl from 'jss-rtl';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/auth/LoginUser';
import { AuthProvider } from '../pages/auth/context/auth';
import PrivateRoute from './PrivateRoute';
import Layout from './Layout';
import Register from '../pages/Register/Register';
import authManager from '../services/authManager';
import Logout from '../pages/auth/LogoutUser';
import FreeLancerProfileForm from '../pages/FreelancerProfile/FreelancerProfileForm';
import Success from '../pages/FreelancerProfile/success';
import { grey, lighterPink, lightGrey, lightPink, pink, white } from '../styles/colors';

const presets = preset().plugins;

const jss = create({ plugins: [...presets, rtl()] });

const theme = createMuiTheme({
  direction: 'ltr', // Both here and <body dir="rtl">
  palette: {
    primary: {
      lighter: lighterPink,
      light: lightPink,
      main: pink,
    },
    secondary: {
      main: white,
    },
    overlay: {
      dark: grey,
      light: lightGrey,
    },
  },
  typography: {
    fontFamily: 'Arial',
  },
});

function App() {
  const { user } = authManager.retrieveUserToken();

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <AuthProvider initialValue={{ currentUser: user }}>
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Register}/>
            <Route path='/logout' component={Logout}/>
            <PrivateRoute
              path='/user/profile'
              component={FreeLancerProfileForm}
            />
            <PrivateRoute path='/user/success' component={Success}/>
            <PrivateRoute path='/' component={Layout}/>
          </Switch>
        </AuthProvider>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
