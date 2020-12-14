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
}));
