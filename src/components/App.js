import React from 'react';
import ClientsList from './client/clientsList';
import Client from './client/client';
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
            <ClientsList clients={clients} />
          </Route>
          <Route path='/clients/:id' component={Client} />
        </Switch>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
