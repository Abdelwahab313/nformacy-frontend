import React from 'react';
import DIRECTION from 'constants/direction';
import useLocale from 'hooks/localization/useLocale';

const Direction = ({ children }) => {
  const { locale } = useLocale();

  return <div dir={DIRECTION[locale]}>{children}</div>;
};

export default Direction;
