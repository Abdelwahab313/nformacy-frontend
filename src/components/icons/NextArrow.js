import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import useLocale from 'hooks/localization/useLocale';

const NextArrow = () => {
  const { locale } = useLocale();
  if (locale === 'en') {
    return <ArrowForwardIcon />;
  } else {
    return <ArrowBackIcon />;
  }
};
export default NextArrow;
