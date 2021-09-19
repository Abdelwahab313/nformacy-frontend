import React from 'react';

import Button from 'components/buttons/RegularButton';
import Icon from '@material-ui/icons/Notifications';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/components/headerLinksStyle';
import { notificationsListId } from './index';
import { useNotificationsContext } from 'hooks/notifications/context';

const useStyles = makeStyles(styles);

const NotificationsIcon = ({ menuOpened, toggleMenu, closeMenu }) => {
  const classes = useStyles();
  const [{ unread, unreadCount }] = useNotificationsContext();

  return (
    <Button
      id='notificationsButton'
      color={window.innerWidth > 319 ? 'transparent' : 'white'}
      justIcon={window.innerWidth > 319}
      simple={!(window.innerWidth > 319)}
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
      <Hidden lgDown lgUp implementation='css'>
        <p onClick={closeMenu} className={classes.linkText}>
          Notification
        </p>
      </Hidden>
    </Button>
  );
};

export default NotificationsIcon;
