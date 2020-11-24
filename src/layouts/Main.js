import React, { useEffect, useState } from 'react';
import {
  createMuiTheme,
  responsiveFontSizes,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/core/styles';
import { create } from 'jss';
import preset from 'jss-preset-default';
import rtl from 'jss-rtl';
import {
  brightGray,
  darkBlue,
  grey,
  lighterPink,
  lightGrey,
  lightPink,
} from 'styles/colors';
import MainRouter from 'layouts/MainRouter';
import '../styles/fonts.css';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import useLocale from '../hooks/localization/useLocale';
import { useTranslation } from 'react-i18next';
import DIRECTIONS from '../constants/direction';
import moment from 'moment';
import SnackBarWrapper from 'components/feedback/SnackBarWrapper';

const presets = preset().plugins;

const jss = create({ plugins: [...presets, rtl()] });

const queryCache = new QueryCache();

function Main() {
  const [, setLoading] = useState(true);
  const { i18n } = useTranslation();
  const { locale } = useLocale();
  moment.locale(locale);

  useEffect(() => {
    i18n.changeLanguage(locale).then(() => {
      setLoading(false);
    });
  }, [locale]);

  let theme = createMuiTheme({
    direction: DIRECTIONS[locale],
    palette: {
      primary: {
        lighter: lighterPink,
        light: lightPink,
        main: darkBlue,
      },
      secondary: {
        main: lightGrey,
        dark: brightGray,
      },
      overlay: {
        dark: grey,
        light: lightGrey,
      },
    },
  });
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <SnackBarWrapper>
            <MainRouter />
            {/* {isDebugMode && <ReactQueryDevtools initialIsOpen />} */}
          </SnackBarWrapper>
        </ReactQueryCacheProvider>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default Main;
