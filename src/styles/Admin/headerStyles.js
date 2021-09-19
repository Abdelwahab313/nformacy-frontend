import { makeStyles } from '@material-ui/core/styles';

export const useHeaderStyles = makeStyles((theme) => ({
  notificationMenu: {
    zIndex: '1',
    height: '100vh',
    overflowY: 'auto',
    [theme.breakpoints.down('md')]: {
      maxWidth: 275,
    },
  },
}));
