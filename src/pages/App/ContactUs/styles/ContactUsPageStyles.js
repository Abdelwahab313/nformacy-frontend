import { makeStyles } from '@material-ui/core';
import { lightGrey } from 'styles/colors';

const useStyles = makeStyles((theme) => ({
  headerCard: {
    position: 'relative',
    width: '100%',
    background: '#dfeef5',
  },
  headerCardImg: {
    height: 370,
    objectFit: 'contain',
    [theme.breakpoints.down('md')]: {
      height: 125,
    },
  },
  headerCardTxt: {
    position: 'absolute',
    top: '43%',
    left: '10%',
    right: 0,
    [theme.breakpoints.down('md')]: {
      left: '9%',
      width: 'min-content',
      top: '25%',
    },
  },
  blocksContainer: {
    display: 'flex',
    width: '100%',
    padding: '115px 0',
    borderBottom: `1px solid ${lightGrey}`,
  },
  firstSection: {
    borderRight: `1px solid ${lightGrey}`,
  },
  imgIcon: {
    height: 200,
    [theme.breakpoints.down('md')]: {
      height: 100,
    },
  },
  noTextTransform: {
    textTransform: 'none',
  },
}));

export default useStyles;
