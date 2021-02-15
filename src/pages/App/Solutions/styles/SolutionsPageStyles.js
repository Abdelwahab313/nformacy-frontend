import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  solutionDescContainer: {
    margin: [theme.spacing(13), 0],
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      margin: [theme.spacing(6), 0],
    },
  },
}));

export default useStyles;
