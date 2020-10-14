import { makeStyles } from '@material-ui/core/styles';
import { darkBlue, grey } from './colors';
import fontNames from '../constants/fonts';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  activeBreadcrumb: {
    fontSize: '1.042vw',
    fontFamily: 'SF UI Display Regular',
    color: darkBlue,
    [theme.breakpoints.down('sm')]: {
      fontSize: '3.200vw',
    },
  },
  inactiveBreadcrumb: {
    fontSize: '1.042vw',
    fontFamily: fontNames.SF_UI_REGULAR,
    color: grey,
    [theme.breakpoints.down('sm')]: {
      fontSize: '3.200vw',
    },
  },
}));
