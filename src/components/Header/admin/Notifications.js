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
import useNotification from '../../../hooks/useNotification';

const useStyles = makeStyles(styles);

export const Notifications = () => {
  const classes = useStyles();
  const {
    notifications,
    notificationsUnopened,
    notificationMenuOpened,
    openNotification,
    closeNotification,
  } = useNotification();

  return (
    <div className={classes.manager}>
      <Button
        id='notificationsButton'
        color={window.innerWidth > 959 ? 'transparent' : 'white'}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-owns={
          notificationMenuOpened ? 'notification-menu-list-grow' : null
        }
        aria-haspopup='true'
        onClick={openNotification}
        className={classes.buttonLink}>
        <NotificationsIcon className={classes.icons} />
        {notificationsUnopened && (
          <span id='notificationsCount' className={classes.notifications}>
            {notifications.length}
          </span>
        )}
        <Hidden mdUp implementation='css'>
          <p onClick={closeNotification} className={classes.linkText}>
            Notification
          </p>
        </Hidden>
      </Button>
      <Poppers
        open={Boolean(notificationMenuOpened)}
        anchorEl={notificationMenuOpened}
        transition
        disablePortal
        className={
          classNames({ [classes.popperClose]: !notificationMenuOpened }) +
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
                      onClick={closeNotification}
                      className={classes.dropdownItem}>
                      {notification}
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
