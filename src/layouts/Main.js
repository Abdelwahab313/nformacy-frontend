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
  lightGrey,
  lighterGrey,
} from 'styles/colors';
import MainRouter from 'layouts/MainRouter';
import '../styles/fonts.css';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import useLocale from '../hooks/localization/useLocale';
import { useTranslation } from 'react-i18next';
import DIRECTIONS from '../constants/direction';
import moment from 'moment';
import SnackBarWrapper from 'components/feedback/SnackBarWrapper';
import LoadingCircle from 'components/progress/LoadingCircle';

const presets = preset().plugins;

const jss = create({ plugins: [...presets, rtl()] });

const queryCache = new QueryCache();

function Main() {
  const [isLoading, setLoading] = useState(true);
  const { i18n } = useTranslation();
  const { locale } = useLocale();
  moment.locale(locale);

  useEffect(() => {
    i18n.changeLanguage(locale).then(() => {
      setLoading(false);
    });
  }, [locale]);

  if (isLoading) {
    return <LoadingCircle />;
  }
  let theme = createMuiTheme({
    direction: DIRECTIONS[locale],
    palette: {
      primary: {
        lighter: lighterGrey,
        light: lightGrey,
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
