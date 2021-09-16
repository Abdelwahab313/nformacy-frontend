import { makeStyles } from '@material-ui/core/styles';
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
    backgroundColor: 'rgb(174 174 174 / 38%)',
    borderRadius: 3,
    marginLeft: 10,
    position: 'relative',
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
    color: black,
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
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  sectionSmallView: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
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
    transition: 'all 0.3s ease-out',
    fontSize: 18,
    '&:hover': {
      color: black,
      fontSize: 20,
      transition: 'all 0.3s ease-in',
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
  notificationMobile: {
    width: 50,
  },
}));

export default useStyles;
