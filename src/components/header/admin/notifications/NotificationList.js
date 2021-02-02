import useNotification from '../../../../hooks/notifications/useNotification';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import React, { Fragment, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../../assets/jss/material-dashboard-react/components/headerLinksStyle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useNotificationsContext } from '../../../../hooks/notifications/context';
import { useHistory } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import QuestionIcon from '../../../../assets/question.svg';
import { useMenuStyles } from '../../../../styles/notificationCard';
import ButtonBase from '@material-ui/core/ButtonBase';
import clsx from 'clsx';
import moment from 'moment';
import { Circle } from '../../../notificationCard/NotificationCard';
import { useTranslation } from 'react-i18next';
import authManager from '../../../../services/authManager';
import Notification from 'core/notifications/Notification';

const useStyles = makeStyles(styles);

const NotificationsBody = ({ closeMenu }) => {
  const classes = useStyles();
  const notificationCardStyle = useMenuStyles();
  const { t } = useTranslation();

  const { notifications, visitNotification } = useNotification();

  if (!notifications) return null;

  return notifications?.map((notification, key) => (
    <ButtonBase
      key={key}
      data-target-id={notification.targetId}
      onClick={() => {
        visitNotification(notification);
        closeMenu();
      }}
      className={
        notification.readAt ? classes.dropdownItem : classes.unreadItem
      }>
      <Grid container>
        <Typography className={notificationCardStyle.notificationTextStyle}>
          <img
            src={QuestionIcon}
            alt='Question'
            className={clsx(notificationCardStyle.avatar, {
              [classes.iconOverlay]: notification.readAt,
            })}
          />
          {Notification.getString(t, notification)}
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

const NotificationsHeader = ({ closeMenu }) => {
  const classes = useStyles();
  const [{ notifications }] = useNotificationsContext();
  const { t } = useTranslation();
  if (!notifications) return null;
  return (
    <Fragment>
      {notifications?.length === 0 && (
        <MenuItem onClick={closeMenu} className={classes.noHoverMenuItem}>
          {t('notifications:noNotifications')}
        </MenuItem>
      )}
    </Fragment>
  );
};

const NotificationsFooter = () => {
  const classes = useStyles();
  const [{ unreadCount, notifications }] = useNotificationsContext();
  const history = useHistory();
  const { t } = useTranslation();

  const oldUnreadNotifications = useMemo(
    () =>
      notifications?.every((notification) => notification.readAt) &&
      unreadCount > 0,
    [unreadCount, notifications],
  );
  const navigateToAllNotifications = () => {
    if (authManager.isAdmin() || authManager.isAdviser()) {
      history.push('/admin/notifications');
    } else history.push('/notifications');
  };
  return (
    <Fragment>
      {(unreadCount > 10 || oldUnreadNotifications) && (
        <MenuItem
          onClick={navigateToAllNotifications}
          className={classes.dropdownItem}>
          {t('notifications:seeMore')}
        </MenuItem>
      )}
    </Fragment>
  );
};

const NotificationList = ({ closeMenu }) => {
  const classes = useMenuStyles();

  return (
    <ClickAwayListener onClickAway={closeMenu}>
      <MenuList role='menu' className={classes.menu}>
        <NotificationsHeader />
        <NotificationsBody closeMenu={closeMenu} />
        <NotificationsFooter />
      </MenuList>
    </ClickAwayListener>
  );
};

export default NotificationList;
