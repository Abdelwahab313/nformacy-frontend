import useNotification from '../../../../hooks/notifications/useNotification';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../../assets/jss/material-dashboard-react/components/headerLinksStyle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useNotificationsContext } from '../../../../hooks/notifications/context';
import { useHistory } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import QuestionIcon from '../../../../assets/Question.svg';
import { useMenuStyles } from '../../../../styles/notificationCard';
import ButtonBase from '@material-ui/core/ButtonBase';
import clsx from 'clsx';
import moment from 'moment';
import { Circle } from '../../../NotificationCard/NotificationCard';

const useStyles = makeStyles(styles);

const NotificationsBody = () => {
  const classes = useStyles();
  const notificationCardStyle = useMenuStyles();

  const [{ notifications }] = useNotificationsContext();
  const { visitNotification } = useNotification();

  if (!notifications) return null;

  return notifications?.map((notification, key) => (
    <ButtonBase
      key={key}
      data-target-id={notification.targetId}
      onClick={() => visitNotification(notification)}
      className={
        notification.readAt ? classes.dropdownItem : classes.unreadItem
      }>
      <Grid container>
        <Typography className={notificationCardStyle.notificationTextStyle}>
          <img
            src={QuestionIcon}
            alt='Question'
            className={notificationCardStyle.avatar}
          />
          {notification.messageKey}
        </Typography>
        <Grid container direction='row' justify='space-between'>
          <Typography
            className={clsx(notificationCardStyle.notificationTime, {
              [notificationCardStyle.unread]: !Boolean(notification.readAt),
              [notificationCardStyle.read]: Boolean(notification.readAt),
            })}
            variant='caption'
            gutterBottom>
            {moment(notification.createdAt).fromNow()}
          </Typography>
          {!Boolean(notification.readAt) && (
            <Circle className={notificationCardStyle.circle} />
          )}
        </Grid>
      </Grid>
    </ButtonBase>
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
  const history = useHistory();

  const oldUnreadNotifications = useMemo(
    () =>
      notifications?.every((notification) => notification.readAt) &&
      unreadCount > 0,
    [unreadCount, notifications],
  );
  const navigateToAllNotifications = () => {
    history.push('/admin/notifications');
  };
  return (
    <>
      {(unreadCount > 10 || oldUnreadNotifications) && (
        <MenuItem
          onClick={navigateToAllNotifications}
          className={classes.dropdownItem}>
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
