import { makeStyles } from '@material-ui/core/styles';
import * as colors from '../../../styles/colors';

const useStyles = makeStyles((theme) => ({
  icon: {
    [theme.breakpoints.down('md')]: {
      fontSize: '2vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '3.467vw',
    },
  },
  anchor: {
    color: colors.darkBlue,
  },
  noTxtIcon: {
    position: 'absolute',
    bottom: 8,
    right: -8,
    padding: 20,
  },

  noTxtIconAr: {
    left: '-8px !important',
    right: 'auto',
  },
  showLessText: {
    paddingLeft: 27,
  },
  showLessTextAr: {
    display: 'flex',
    direction: 'ltr',
  },
  ArrowUpward: {
    position: 'absolute',
    bottom: -9,
    left: -7,
    padding: 20,
  },
  learnMore: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'flex-end',
    margin: '20px 25px',
  },
  learnMoreAr: {

    justifyContent: 'initial',
  
  },
}));

export default useStyles;
