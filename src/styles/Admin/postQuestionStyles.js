import { makeStyles } from '@material-ui/core/styles';
import { darkBlue, white } from '../colors';

export const useStyles = makeStyles((theme) => ({
  headerStyles: {
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: darkBlue,
    borderRadius: '5px',
    color: white,
    padding: theme.spacing(1),
  },
  buttonsContainerStyles: {
    textAlign: 'end'
  },
  postQuestionButton: {
    marginLeft: theme.spacing(2)
  }
}));
