import { makeStyles } from '@material-ui/core';
import { grey } from 'styles/colors';

const useStyles = makeStyles((theme) => ({
  noShadow: {
    boxShadow: 'none',
  },
  desktopVisible: {
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
  shortlistContainer: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
  },
  candidateDesc: {
    margin: 'revert',
    color: grey,
  },
  candidateContainerBorder: {
    borderRadius: 25,
    overflow: 'hidden',
    border: '1px solid #ecedf0',
    transition: 'all 1s',
    '&:hover': {
      transform: 'scale(1.2)',
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
      '&:hover': {
        transform: 'scale(1)',
      },
    },
  },
  candidateImg: {
    height: 150,
    opacity: '0.8',
    borderRadius: '100%',
  },
}));

export default useStyles;
