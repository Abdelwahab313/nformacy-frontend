import { makeStyles } from '@material-ui/core/styles';
import { blackColor, hexToRgb } from '../assets/jss/material-dashboard-react';
import fontNames from '../constants/fonts';

export const useStyles = makeStyles((theme) => ({
  notificationCard: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: '0 1px 4px 0 rgba(' + hexToRgb(blackColor) + ', 0.14)',
    borderRadius: theme.spacing(3),
    color: 'rgba(' + hexToRgb(blackColor) + ', 0.87)',
    '&:hover': {
      background: 'rgba(' + hexToRgb(theme.palette.overlay.light) + ', 0.20)',
      '& $read': {
        color: theme.palette.primary.main,
      },
      '& $iconOverlay': {
        filter: 'grayscale(100%)',
        background: 'rgba(' + hexToRgb(theme.palette.overlay.light) + ', 0)',
      },
    },
  },
  greyOverlay: {
    background: 'rgba(' + hexToRgb(theme.palette.overlay.light) + ', 0.25)',
    '&:hover': {
      background: 'rgba(' + hexToRgb(theme.palette.overlay.dark) + ', 0.20)',
      '& $circle': {
        background: 'rgba(' + hexToRgb(theme.palette.primary.main) + ', 0.80)',
      },
      '& $unread': {
        color: 'rgba(' + hexToRgb(theme.palette.primary.main) + ', 0.80)',
      },
    },
  },
  notificationTextStyle: {
    display: 'inline-flex',
    alignItems: 'center',
    marginLeft: theme.spacing(1),
    fontSize: '1.190vw',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.604vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '4vw',
    },
  },
  unread: {
    color: theme.palette.primary.main,
  },
  read: {
    color: theme.palette.overlay.dark,
  },
  notificationTime: {
    fontSize: '1.0vw',
    [theme.breakpoints.down('xs')]: {
      fontSize: '3.0vw',
      marginLeft: theme.spacing(8),
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '1.5vw',
      marginLeft: theme.spacing(8.5),
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.0vw',
      marginLeft: theme.spacing(9.5),
    },
  },
  circle: {
    marginRight: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.between('xs', 'md')]: {
      width: theme.spacing(1.5),
      height: theme.spacing(1.5),
    },
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(2.5),
      height: theme.spacing(2.5),
    },
    borderRadius: '50%',
  },
  avatar: {
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    [theme.breakpoints.between('xs', 'sm')]: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    [theme.breakpoints.up('lg')]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  },
  iconOverlay: {
    filter: 'grayscale(100%)',
    background: 'rgba(' + hexToRgb(theme.palette.overlay.light) + ', 0.0)',
  },
}));

export const useMenuStyles = makeStyles((theme) => ({
  avatar: {
    borderRadius: theme.spacing(5),
    background: 'rgba(' + hexToRgb(theme.palette.overlay.light) + ', 0.0)',
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    '&:hover': {
      background: 'rgba(' + hexToRgb(theme.palette.overlay.light) + ', 0.20)',
      '& $read': {
        color: theme.palette.primary.main,
      },
    },
  },
  notificationTextStyle: {
    display: 'inline-flex',
    fontFamily: fontNames.SF_UI_REGULAR,
    alignItems: 'center',
  },
  circle: {
    backgroundColor: theme.palette.primary.main,
    height: theme.spacing(1),
    width: theme.spacing(1),
    borderRadius: '50%',
  },
  unread: {
    color: theme.palette.primary.main,
  },
  read: {
    color: theme.palette.overlay.dark,
  },
  notificationTime: {
    marginLeft: theme.spacing(4),
  },
  menu: {
    zIndex: '1',
  },
}));
