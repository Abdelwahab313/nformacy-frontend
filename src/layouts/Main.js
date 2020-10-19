import React from 'react';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import preset from 'jss-preset-default';
import rtl from 'jss-rtl';
import { AuthProvider } from 'pages/auth/context/auth';
import authManager from 'services/authManager';
import { darkBlue, grey, lighterPink, lightGrey, lightPink } from 'styles/colors';
import MainRouter from 'layouts/MainRouter';
import '../styles/fonts.css';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import fontNames from '../constants/fonts';

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
      main: lightGrey,
    },
    overlay: {
      dark: grey,
      light: lightGrey,
    },
  },
  typography: {
    fontFamily: [
      fontNames.SF_UI_REGULAR,
      fontNames.SF_UI_LIGHT,
      fontNames.SF_UI_BOLD,
      fontNames.APERCU_PRO_Regular,
      fontNames.APERCU_PRO_MEDUIUM,
      fontNames.SF_COMPACT_TEXT_REGULAR,
      fontNames.TAJAWAL_BOLD,
    ].join(','),
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
