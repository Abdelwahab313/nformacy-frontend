import Button from '../../buttons/RegularButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Hidden from '@material-ui/core/Hidden';
import Poppers from '@material-ui/core/Popper';
import classNames from 'classnames';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../assets/jss/material-dashboard-react/components/headerLinksStyle';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import useNotification from '../../../hooks/notifications/useNotification';

const useStyles = makeStyles(styles);

export const Notifications = () => {
  const classes = useStyles();
  const {
    notifications,
    unread,
    unreadCount,
    menuOpened,
    toggleMenu,
    closeNotification,
  } = useNotification();
  return (
    <div className={classes.manager}>
      <Button
        id='notificationsButton'
        color={window.innerWidth > 959 ? 'transparent' : 'white'}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-owns={menuOpened ? 'notification-menu-list-grow' : null}
        aria-haspopup='true'
        onClick={toggleMenu}
        className={classes.buttonLink}>
        <NotificationsIcon className={classes.icons} />
        {unread && (
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
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id='notification-menu-list-grow'
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}>
            <Paper>
              <ClickAwayListener onClickAway={closeNotification}>
                <MenuList role='menu'>
                  {notifications.map((notification, key) => (
                    <MenuItem
                      key={key}
                      data-target-id={notification.targetId}
                      onClick={closeNotification}
                      className={classes.dropdownItem}>
                      {notification.messageKey}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Poppers>
    </div>
  );
};
