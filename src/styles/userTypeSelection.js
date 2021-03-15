import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  usersTypeContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    [theme.breakpoints.down('md')]: {
      position: 'relative'
    }
  },
  userImg: {
    width: 200,
    height: 200,
    marginBottom: 10
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
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '0 !important'
    }
  },
  usersTypeContainerBorder: {
    width: '65%',
    height: 200,
    borderRadius: 25,
    overflow: 'hidden',
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
  },
  corporateTypeContainerBorder: {
    border: '1px solid #0DA1A1',
  },
  clientTypeContainerBorder: {
    border: '1px solid #00415a',
  },
  consultantTypeContainerBorder: {
    border: '1px solid #bc5003',
  }
}));
