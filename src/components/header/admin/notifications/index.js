import Poppers from '@material-ui/core/Popper';
import classNames from 'classnames';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../../assets/jss/material-dashboard-react/components/headerLinksStyle';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import useNotification from '../../../../hooks/notifications/useNotification';
import NotificationsIcon from './NotificationsIcon';
import NotificationList from './NotificationList';
import { useHeaderStyles } from '../../../../styles/Admin/headerStyles';
import authManager from 'services/authManager';
import { NotificationsProvider } from 'hooks/notifications/context';

const useStyles = makeStyles(styles);
export const notificationsListId = 'notification-menu-list-grow';

const Notifications = () => {
  const classes = useStyles();
  const headerClasses = useHeaderStyles();
  const [menuOpened, setMenuOpened] = useState('');
  useNotification();

  const toggleMenu = (event) => {
    if (!!menuOpened && menuOpened?.contains(event.target)) {
      setMenuOpened(null);
    } else {
      setMenuOpened(event.currentTarget);
    }
  };

  const closeMenu = () => {
    setMenuOpened(null);
  };

  return (
    <div className={classes.manager}>
      <NotificationsIcon
        menuOpened={menuOpened}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
      />
      <Poppers
        open={Boolean(menuOpened)}
        anchorEl={menuOpened}
        transition
        disablePortal
        className={classNames({
          [classes.popperClose]: !menuOpened,
          [classes.popperNav]: true,
          [headerClasses.notificationMenu]: true,
        })}>
        {({ TransitionProps, placement }) => {
          return (
            <Grow
              {...TransitionProps}
              id={notificationsListId}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}>
              <Paper>
                <NotificationList closeMenu={closeMenu} />
              </Paper>
            </Grow>
          );
        }}
      </Poppers>
    </div>
  );
};

const WithNotification = (props) => {
  const user = authManager.retrieveCurrentUser();
  return (
    <NotificationsProvider
      initialNotifications={user?.notifications}
      unreadCount={user?.unreadNotifications}>
      <Notifications {...props} />
    </NotificationsProvider>
  );
};

export default WithNotification;
