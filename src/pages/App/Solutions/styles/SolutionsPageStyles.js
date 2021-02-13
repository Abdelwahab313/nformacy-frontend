import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  headerCard: {
    position: 'relative',
    width: '100%',
    background: '#dfeef5',
  },
  headerCardImg: {
    height: 370,
    objectFit: 'contain',
    float: 'right',
    width: 'initial',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: 125,
    },
  },
  headerCardTxt: {
    position: 'absolute',
    top: '40%',
    left: '16%',
    right: 0,
    [theme.breakpoints.down('md')]: {
      left: '9%',
      width: 'min-content',
      top: '35%',
    },
  },
  solutionDescContainer: {
    margin: [theme.spacing(13), 0],
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      margin: [theme.spacing(6), 0],
    },
  },
}));

export default useStyles;
