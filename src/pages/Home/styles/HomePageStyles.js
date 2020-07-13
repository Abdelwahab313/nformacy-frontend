import { makeStyles } from '@material-ui/core';
import { lightTurquoise } from '../../../styles/colors';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    marginBottom: theme.spacing(3),
    borderRadius: 25,
    backgroundColor: lightTurquoise,
  },
  media: {
    height: 140,
  },
  sidebar: {
    padding: theme.spacing(3),
  },
}));

export default useStyles;
