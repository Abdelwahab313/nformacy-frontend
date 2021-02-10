import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  usersTypeContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  userImg: {
    width: 250,
    height: 250,
  },
  userTypeDesc: {
    borderRadius: 25,
    borderWidth: 1,
    borderStyle: 'solid',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  capitalizeText: {
    textTransform: 'none',
    padding: 20
  },
  centerCard: {
    textAlign: 'center'
  },
  usersTypeContainerBorder: {
    borderRadius: 25,
    overflow: 'hidden',
    border: '1px solid #ecedf0',
    transition: 'all 1s',
    '&:hover': {
      transform: 'scale(1.2)',
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
      '&:hover': {
        transform: 'scale(1)',
      },
    },
  }
}));
