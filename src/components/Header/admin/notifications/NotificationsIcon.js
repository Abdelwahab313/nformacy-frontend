import useNotification from '../../../../hooks/notifications/useNotification';
import Button from '../../../buttons/RegularButton';
import Icon from '@material-ui/icons/Notifications';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../../assets/jss/material-dashboard-react/components/headerLinksStyle';
import { notificationsListId } from './index';
import { useNotificationsContext } from '../../../../hooks/notifications/context';

const useStyles = makeStyles(styles);

const NotificationsIcon = () => {
  const classes = useStyles();
  const { closeNotification, toggleMenu } = useNotification();
  const [{ menuOpened, unread, unreadCount }] = useNotificationsContext();

  return (
    <Button
      id='notificationsButton'
      color={window.innerWidth > 959 ? 'transparent' : 'white'}
      justIcon={window.innerWidth > 959}
      simple={!(window.innerWidth > 959)}
      aria-owns={menuOpened ? notificationsListId : null}
      aria-haspopup='true'
      onClick={toggleMenu}
      className={classes.buttonLink}>
      <Icon className={classes.icons} />
      {unread && unreadCount > 0 && (
        <span id='notificationsCount' className={classes.notifications}>
          {unreadCount}
        </span>
      )}
      <Hidden mdUp implementation='css'>
        <p onClick={closeNotification} className={classes.linkText}>
          Notification
        </p>
      </Hidden>
    </Button>
  );
};

export default NotificationsIcon;
