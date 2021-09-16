import { makeStyles } from '@material-ui/core/styles';

export const useHeaderStyles = makeStyles((theme) => ({
  notificationMenu: {
    zIndex: '1',
    [theme.breakpoints.down('md')]: {
      maxWidth: 275,
    },
  },
}));
