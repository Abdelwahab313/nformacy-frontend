import { makeStyles } from '@material-ui/core';
import { lightGrey } from 'styles/colors';

const useStyles = makeStyles((theme) => ({

  bannerImageStyles: {
    width: '100%',
    height: 370,
  },
  bannerTitle: {
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(15),
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
