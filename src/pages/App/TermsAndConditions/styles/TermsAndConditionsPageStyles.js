import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  headerCard: {
    position: 'relative',
    width: '100%',
    maxHeight: 270,
  },
  headerCardImg: {
    height: 270,
    [theme.breakpoints.down('md')]: {
      height: '100%',
    },
  },
  headerCardTxt: {
    position: 'absolute',
    top: '35%',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {},
  },
}));

export default useStyles;
