import React from 'react';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import preset from 'jss-preset-default';
import rtl from 'jss-rtl';
import { AuthProvider } from 'pages/auth/context/auth';
import authManager from 'services/authManager';
import { grey, lighterPink, lightGrey, lightPink, pink, white } from 'styles/colors';
import MainRouter from 'layouts/MainRouter';

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
    fontFamily: 'SF UI Display',
  },
});

function Main() {
  const { user } = authManager.retrieveUserToken();

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <AuthProvider initialValue={{ currentUser: user }}>
          <MainRouter/>
        </AuthProvider>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default Main;
