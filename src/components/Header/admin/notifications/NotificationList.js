import useNotification from '../../../../hooks/notifications/useNotification';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../../assets/jss/material-dashboard-react/components/headerLinksStyle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useNotificationsContext } from '../../../../hooks/notifications/context';

const useStyles = makeStyles(styles);

const NotificationsBody = () => {
  const classes = useStyles();
  const [{ notifications }] = useNotificationsContext();
  const { visitNotification } = useNotification();

  if (!notifications) return null;

  return notifications?.map((notification, key) => (
    <MenuItem
      key={key}
      data-target-id={notification.targetId}
      onClick={() => visitNotification(notification)}
      className={
        notification.readAt ? classes.dropdownItem : classes.unreadItem
      }>
      {notification.messageKey}
    </MenuItem>
  ));
};

const NotificationsHeader = () => {
  const classes = useStyles();
  const [{ notifications }] = useNotificationsContext();
  const { closeNotification } = useNotification();
  if (!notifications) return null;
  return (
    <>
      {notifications?.length === 0 && (
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
  const [{ unreadCount, notifications }] = useNotificationsContext();
  const oldUnreadNotifications = useMemo(
    () =>
      notifications?.every((notification) => notification.readAt) &&
      unreadCount > 0,
    [unreadCount, notifications],
  );
  const { closeNotification } = useNotification();
  return (
    <>
      {(unreadCount > 10 || oldUnreadNotifications) && (
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
