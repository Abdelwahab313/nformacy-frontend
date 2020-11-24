import React from 'react';
import DIRECTION from 'constants/direction';
import useLocale from 'hooks/localization/useLocale';
import { makeStyles } from '@material-ui/core';

const Direction = ({ children }) => {
  const { locale } = useLocale();
  const classes= useStyles();

  return <div className={classes.root} dir={DIRECTION[locale]}>{children}</div>;
};
const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));
export default Direction;
