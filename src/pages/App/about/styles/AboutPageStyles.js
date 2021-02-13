import { makeStyles } from '@material-ui/core';
import { white } from 'styles/colors';

const useStyles = makeStyles((theme) => ({
  headerCard: {
    position: 'relative',
    width: '100%',
  },
  headerCardImg: {
    height: 370,
    [theme.breakpoints.down('md')]: {
      height: 125,
    },
  },
  headerCardTxt: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      top: '35%',
    },
  },
  DarkGrayBg: {
    backgroundColor: '#4c4a4b',
    color: white,
  },
  aboutDescContainer: {
    margin: [theme.spacing(13), 0],
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      margin: [theme.spacing(6), 0],
    },
  },
}));

export default useStyles;
