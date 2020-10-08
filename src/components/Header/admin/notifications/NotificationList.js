import useNotification from '../../../../hooks/notifications/useNotification';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../../assets/jss/material-dashboard-react/components/headerLinksStyle';

const useStyles = makeStyles(styles);

const NotificationsBody = () => {
  const classes = useStyles();
  const { notifications, navigateToNotification } = useNotification();

  return notifications.map((notification, key) => (
    <MenuItem
      key={key}
      data-target-id={notification.targetId}
      onClick={() => navigateToNotification(notification)}
      className={classes.dropdownItem}>
      {notification.messageKey}
    </MenuItem>
  ));
};

const NotificationsHeader = () => {
  const classes = useStyles();
  const { closeNotification, unreadCount } = useNotification();
  return (
    <>
      {unreadCount === 0 && (
        <MenuItem
          onClick={closeNotification}
          className={classes.noHoverMenuItem}>
          No notifications to be displayed
        </MenuItem>
      )}
    </>
  );
};

const NotificationsFooter = () => {
  const classes = useStyles();

  const { closeNotification, unreadCount } = useNotification();
  return (
    <>
      {unreadCount > 10 && (
        <MenuItem onClick={closeNotification} className={classes.dropdownItem}>
          See more...
        </MenuItem>
      )}
    </>
  );
};

const NotificationList = () => {
  return (
    <MenuList role='menu'>
      <NotificationsHeader />
      <NotificationsBody />
      <NotificationsFooter />
    </MenuList>
  );
};

export default NotificationList;
