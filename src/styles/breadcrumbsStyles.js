import { makeStyles } from '@material-ui/core/styles';
import { darkBlue, darkGrey } from './colors';
import fontNames from '../constants/fonts';
import { hexToRgb } from '../assets/jss/material-dashboard-react';

const fontStyle = (theme) => ({
  fontFamily: fontNames.SF_UI_LIGHT,
  fontSize: '1.042vw',
  [theme.breakpoints.up('xl')]: {
    fontSize: '0.980vw',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1.142vw',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '4vw',
  },
});
export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  activeBreadcrumb: {
    ...fontStyle(theme),
    color: darkBlue,
  },
  inactiveBreadcrumb: {
    ...fontStyle(theme),
    color: 'rgba(' + hexToRgb(darkGrey) + ', 0.5)',
  },
}));
