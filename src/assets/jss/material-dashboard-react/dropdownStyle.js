import {
  blackColor,
  defaultFont,
  grayColor,
  hexToRgb,
  whiteColor,
} from 'assets/jss/material-dashboard-react.js';
import { overlayColor } from '../../../styles/colors';

const dropdownStyle = (theme) => ({
  buttonLink: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      marginLeft: '30px',
      width: 'auto',
    },
  },
  links: {
    width: '20px',
    height: '20px',
    zIndex: '4',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      width: '30px',
      height: '30px',
      color: grayColor[9],
      marginRight: '15px',
    },
  },
  linkText: {
    zIndex: '4',
    ...defaultFont,
    fontSize: '14px',
  },
  popperClose: {
    pointerEvents: 'none',
  },
  popperResponsive: {
    [theme.breakpoints.down('md')]: {
      zIndex: '1640',
      position: 'static',
      float: 'none',
      width: 'auto',
      marginTop: '0',
      backgroundColor: 'transparent',
      border: '0',
      WebkitBoxShadow: 'none',
      boxShadow: 'none',
      color: 'black',
    },
  },
  popperNav: {
    [theme.breakpoints.down('sm')]: {
      position: 'static !important',
      left: 'unset !important',
      top: 'unset !important',
      transform: 'none !important',
      willChange: 'unset !important',
      '& > div': {
        boxShadow: 'none !important',
        marginLeft: '0rem',
        marginRight: '0rem',
        transition: 'none !important',
        marginTop: '0px !important',
        marginBottom: '0px !important',
        padding: '0px !important',
        backgroundColor: 'transparent !important',
        '& ul li': {
          color: whiteColor + ' !important',
          margin: '10px 15px 0!important',
          padding: '10px 15px !important',
          '&:hover': {
            backgroundColor: 'hsla(0,0%,78%,.2)',
            boxShadow: 'none',
          },
        },
      },
    },
  },
  dropdown: {
    borderRadius: '3px',
    border: '0',
    boxShadow: '0 2px 5px 0 rgba(' + hexToRgb(blackColor) + ', 0.26)',
    top: '100%',
    zIndex: '1000',
    minWidth: '160px',
    padding: '5px 0',
    margin: '2px 0 0',
    fontSize: '14px',
    textAlign: 'left',
    listStyle: 'none',
    backgroundColor: whiteColor,
    WebkitBackgroundClip: 'padding-box',
    backgroundClip: 'padding-box',
  },
  dropdownItem: {
    ...defaultFont,
    width: '100%',
    fontSize: '13px',
    padding: '10px 20px',
    borderRadius: '2px',
    WebkitTransition: 'all 150ms linear',
    MozTransition: 'all 150ms linear',
    OTransition: 'all 150ms linear',
    MsTransition: 'all 150ms linear',
    transition: 'all 150ms linear',
    display: 'block',
    clear: 'both',
    fontWeight: '400',
    lineHeight: '1.42857143',
    color: grayColor[8],
    whiteSpace: 'nowrap',
    height: 'unset',
    minHeight: 'unset',
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
  iconOverlay: {
    filter: 'grayscale(100%)',
    background: 'rgba(' + hexToRgb(theme.palette.overlay.light) + ', 0.0)',
  },
  unreadItem: {
    ...defaultFont,
    width: '100%',
    backgroundColor: 'rgba(' + hexToRgb(overlayColor) + ', 0.50)',
    fontSize: '13px',
    padding: '10px 20px',
    borderRadius: '2px',
    WebkitTransition: 'all 150ms linear',
    MozTransition: 'all 150ms linear',
    OTransition: 'all 150ms linear',
    MsTransition: 'all 150ms linear',
    transition: 'all 150ms linear',
    display: 'block',
    clear: 'both',
    fontWeight: '400',
    lineHeight: '1.42857143',
    color: grayColor[8],
    whiteSpace: 'nowrap',
    height: 'unset',
    minHeight: 'unset',
    '&:hover': {
      background: 'rgba(' + hexToRgb(theme.palette.overlay.dark) + ', 0.20)',
      '& $unread': {
        color: 'rgba(' + hexToRgb(theme.palette.primary.main) + ', 0.80)',
      },
    },
  },
  notificationsItemsMobile: {
    [theme.breakpoints.down('md')]: {
      overflowX: 'scroll',
    },
  },
  noHoverMenuItem: {
    fontSize: '13px',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '2px',
    WebkitTransition: 'all 150ms linear',
    MozTransition: 'all 150ms linear',
    OTransition: 'all 150ms linear',
    MsTransition: 'all 150ms linear',
    transition: 'all 150ms linear',
    display: 'block',
    clear: 'both',
    fontWeight: '400',
    lineHeight: '1.42857143',
    color: grayColor[8],
    whiteSpace: 'nowrap',
    height: 'unset',
    minHeight: 'unset',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

export default dropdownStyle;
