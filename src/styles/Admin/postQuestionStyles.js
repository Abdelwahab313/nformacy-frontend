import { makeStyles } from '@material-ui/core/styles';
import { pink, white } from '../colors';

export const useStyles = makeStyles((theme) => ({
  headerStyles: {
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: pink,
    borderRadius: '5px',
    color: white,
    padding: theme.spacing(1),
  },
  buttonsContainerStyles: {
    textAlign: 'end'
  },
}));