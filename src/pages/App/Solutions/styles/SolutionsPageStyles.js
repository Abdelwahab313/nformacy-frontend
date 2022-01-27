import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  solutionDescContainer: {
    margin: [theme.spacing(13), 0],
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      margin: [theme.spacing(1), 0],
    },
  },
  solutionDescContainerAr: {
    direction: 'ltr',
  },

  solutionsImageBanner: {
    height: 500,
    width: 'auto',
    [theme.breakpoints.down('md')]: {
      height: 180,
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      height: 300,
      width: '85%',
    },
    [theme.breakpoints.down('xs')]: {
      height: 200,
      width: '100%',
    },
  },
  landingContainer: {
    maxWidth: 1440,
    margin: 'auto',
  },
}));

export default useStyles;
