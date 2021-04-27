import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  solutionDescContainer: {
    margin: [theme.spacing(13), 0],
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      margin: [theme.spacing(6), 0],
    },
  },
  solutionsImageBanner: {
    height: 500,
    width: '93%',
    [theme.breakpoints.down('md')]: {
      height: 180,
      width: '100%',
    },
  },
  landingContainer: {
    maxWidth: 1440,
    margin: 'auto',
  },
}));

export default useStyles;
