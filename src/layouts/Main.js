import React, { useEffect, useState } from 'react';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import preset from 'jss-preset-default';
import rtl from 'jss-rtl';
import { darkBlue, grey, lighterPink, lightGrey, lightPink } from 'styles/colors';
import MainRouter from 'layouts/MainRouter';
import '../styles/fonts.css';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import fontNames from '../constants/fonts';
import useLocale from '../hooks/localization/useLocale';
import { useTranslation } from 'react-i18next';
import DIRECTIONS from '../constants/direction';

const presets = preset().plugins;

const jss = create({ plugins: [...presets, rtl()] });

const queryCache = new QueryCache();

function Main() {
  const [, setLoading] = useState(true);
  const { i18n } = useTranslation();
  const { locale } = useLocale();

  useEffect(() => {
    i18n.changeLanguage(locale).then(() => {
      setLoading(false);
    });
  }, [locale]);

  const theme = createMuiTheme({
    direction: DIRECTIONS[locale],
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

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <MainRouter />
        </ReactQueryCacheProvider>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default Main;
