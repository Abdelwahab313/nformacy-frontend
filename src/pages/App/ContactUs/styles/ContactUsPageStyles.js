import { makeStyles } from '@material-ui/core';
import { lightGrey } from 'styles/colors';

const useStyles = makeStyles((theme) => ({
  headerCard: {
    position: 'relative',
    width: '100%',
  },
  headerCardImg: {
    height: 270,
    [theme.breakpoints.down('md')]: {
      height: 115,
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
  blocksContainer: {
    display: 'flex',
    width: '100%',
    borderBottom: `1px solid ${lightGrey}`,
  },
  firstSection: {
    borderRight: `1px solid ${lightGrey}`,
  },
  imgIcon: {
    height: 285,
    [theme.breakpoints.down('md')]: {
      height: 175,
    },
  },
}));

export default useStyles;
