import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  successRootContainer: {
    height: '100vh',
  },
  successMessageContainer: {
    height: '100vh',
    paddingTop: 50,
  },
  successText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: '1.85vw',
    fontWeight: '600',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      fontSize: '3vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '5vw',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '1.00vw',
    },
  },
  subtext: {
    alignSelf: 'flex-end',
    fontSize: '1.190vw',
    fontWeight: '600',
    justifySelf: 'flex-end',
    textAlign: 'left',
    [theme.breakpoints.up('xl')]: {
      fontSize: '0.9vw',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.604vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '4vw',
    },
  },
}));
