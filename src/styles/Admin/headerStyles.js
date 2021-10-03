import { makeStyles } from '@material-ui/core/styles';

export const useHeaderStyles = makeStyles((theme) => ({
  notificationMenu: {
    zIndex: '1',
    height: '100vh',
    overflowY: 'auto',
    transform: 'translate3d(-186px, 60px, 0px) !important',
    left: 'initial !important',
    [theme.breakpoints.down('md')]: {
      maxWidth: 275,
    },
  },
}));
