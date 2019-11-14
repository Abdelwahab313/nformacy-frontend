import React from 'react';
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

const presets = preset().plugins;

const jss = create({ plugins: [...presets, rtl()] });

const theme = createMuiTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/clients/list' component={ClientsList} />
          <Route path='/clients/:id' component={Client} />
        </Switch>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
