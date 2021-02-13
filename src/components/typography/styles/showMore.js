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
    bottom: 1,
    right: -18,
    padding: 20,
  },
}));

export default useStyles;
