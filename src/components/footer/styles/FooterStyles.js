import { makeStyles } from '@material-ui/core';
import { grey, lighterGrey } from 'styles/colors';

const useStyles = makeStyles((theme) => ({
  footerContainer: {
    background: lighterGrey,
    padding: theme.spacing(11),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(5),
    },
  },
  socialMediaIcon: {
    padding: theme.spacing(1),
  },
  footerSectionDivider: {
    width: '85%',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  flexClass: {
    display: 'flex',
    color: grey,
  },
  flexClassAr: {
    direction: 'ltr',
  },
  dateClass: {
   marginRight: '7px',
  },
  desktopVisible: {
    display: 'block',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  mobileVisible: {
    display: 'none',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
}));

export default useStyles;
