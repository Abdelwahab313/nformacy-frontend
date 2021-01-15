import { fade, makeStyles } from '@material-ui/core/styles';
import { black, darkOrange, grey, lightOrange, white } from 'styles/colors';

const useStyles = makeStyles((theme) => ({
  html: {
    scrollBehavior: 'smooth',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  headerBackground: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    padding: theme.spacing(1),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  languageButton: {
    margin: `0 ${theme.spacing(1)}px`,
  },
  desktopVisible: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  mobileVisible: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  menuItemText: {
    textDecoration: 'none',
    padding: theme.spacing(1),
    color: grey,
    fontSize: 18,
    '&:hover': {
      color: black,
      fontSize: 20,
    },
  },
  mobileLogoContainer: {
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      left: 0,
      right: 0,
      width: 27,
      margin: 'auto',
    },
  },
  orangeCtaBtn: {
    background: `${lightOrange} !important`,
    color: `${white} !important`,
  },
  LandingSearchContainer: {
    position: 'absolute',
    right: 170,
  },
  list: {
    width: 250,
  },
  active: {
    color: darkOrange,
  },
}));

export default useStyles;
