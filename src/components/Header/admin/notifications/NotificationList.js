import useNotification from '../../../../hooks/notifications/useNotification';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../../assets/jss/material-dashboard-react/components/headerLinksStyle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
  notificationActions,
  useNotificationsContext,
} from '../../../../hooks/notifications/context';
import { useAuth } from '../../../../pages/auth/context/auth';

const useStyles = makeStyles(styles);

const NotificationsBody = () => {
  const classes = useStyles();
  const [{ currentUser }] = useAuth();
  const [, dispatch] = useNotificationsContext();
  const { notifications } = useNotification();

  return notifications.map((notification, key) => (
    <MenuItem
      key={key}
      data-target-id={notification.targetId}
      onClick={() =>
        dispatch({
          type: notificationActions.notificationVisited,
          payload: { notification: notification, currentUser },
        })
      }
      className={
        notification.readAt ? classes.dropdownItem : classes.unreadItem
      }>
      {notification.messageKey}
    </MenuItem>
  ));
};

const NotificationsHeader = () => {
  const classes = useStyles();
  const { closeNotification, notifications } = useNotification();
  return (
    <>
      {notifications.length === 0 && (
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
  const { closeNotification } = useNotification();

  return (
    <ClickAwayListener onClickAway={closeNotification}>
      <MenuList role='menu'>
        <NotificationsHeader />
        <NotificationsBody />
        <NotificationsFooter />
      </MenuList>
    </ClickAwayListener>
  );
};

export default NotificationList;
