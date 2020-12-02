import { makeStyles } from '@material-ui/core';
import { grey } from 'styles/colors';

const useStyles = makeStyles((theme) => ({
  shortlistContainer: {
    marginTop: theme.spacing(4),
  },
  candidateDesc: {
    margin: 'revert',
    color: grey,
  },
  candidateContainerBorder: {
    borderRadius: 25,
    border: '1px solid #ecedf0',
    transition: 'all 1s',
    '&:hover': {
      transform: 'scale(1.2)',
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(5),
      marginTop: theme.spacing(2),
    },
  },
  candidateImg: {
    width: '100%',
    height: 250,
    opacity: '0.8',
  },
}));

export default useStyles;
