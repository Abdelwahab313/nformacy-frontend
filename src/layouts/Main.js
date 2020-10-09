import React from 'react';
import {
  createMuiTheme,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/core/styles';
import { create } from 'jss';
import preset from 'jss-preset-default';
import rtl from 'jss-rtl';
import { AuthProvider } from 'pages/auth/context/auth';
import authManager from 'services/authManager';
import {
  grey,
  lighterPink,
  lightGrey,
  lightPink,
  darkBlue,
  white,
} from 'styles/colors';
import MainRouter from 'layouts/MainRouter';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';

const presets = preset().plugins;

const jss = create({ plugins: [...presets, rtl()] });

const theme = createMuiTheme({
  direction: 'ltr', // Both here and <body dir="rtl">
  palette: {
    primary: {
      lighter: lighterPink,
      light: lightPink,
      main: darkBlue,
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
    fontFamily: 'SF UI Display',
  },
});
const queryCache = new QueryCache();

function Main() {
  const { user } = authManager.retrieveUserToken();

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <AuthProvider initialValue={{ currentUser: user }}>
          <ReactQueryCacheProvider queryCache={queryCache}>
            <MainRouter />
          </ReactQueryCacheProvider>
        </AuthProvider>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default Main;
