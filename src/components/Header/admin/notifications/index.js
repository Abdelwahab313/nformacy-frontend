import Poppers from '@material-ui/core/Popper';
import classNames from 'classnames';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../../assets/jss/material-dashboard-react/components/headerLinksStyle';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import useNotification from '../../../../hooks/notifications/useNotification';
import NotificationsIcon from './NotificationsIcon';
import NotificationList from './NotificationList';

const useStyles = makeStyles(styles);
export const notificationsListId = 'notification-menu-list-grow';

const Notifications = () => {
  const classes = useStyles();
  const { menuOpened, closeNotification } = useNotification();
  return (
    <div className={classes.manager}>
      <NotificationsIcon />
      <Poppers
        open={Boolean(menuOpened)}
        anchorEl={menuOpened}
        transition
        disablePortal
        className={
          classNames({ [classes.popperClose]: !menuOpened }) +
          ' ' +
          classes.popperNav
        }>
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
                <ClickAwayListener onClickAway={closeNotification}>
                  <NotificationList />
                </ClickAwayListener>
              </Paper>
            </Grow>
          );
        }}
      </Poppers>
    </div>
  );
};

export default Notifications;
