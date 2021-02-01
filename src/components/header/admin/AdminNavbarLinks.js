import React, { useCallback } from 'react';
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Hidden from '@material-ui/core/Hidden';
import Poppers from '@material-ui/core/Popper';
import Divider from '@material-ui/core/Divider';
// @material-ui/icons
import Person from '@material-ui/icons/Person';
import Dashboard from '@material-ui/icons/Dashboard';
import Search from '@material-ui/icons/Search';
// core components
import CustomInput from 'components/inputs/CustomInput.js';
import Button from 'components/buttons/RegularButton.js';

import styles from 'assets/jss/material-dashboard-react/components/headerLinksStyle.js';
import { Link, useHistory } from 'react-router-dom';
import { RoutesPaths } from 'constants/routesPath';
import Notifications from './notifications';
import { getAdminProfile } from 'services/navigation';
import authManager from 'services/authManager';

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const [openProfile, setOpenProfile] = React.useState(null);
  const history = useHistory();
  const currentUser = authManager.retrieveCurrentUser();

  const handleClickProfile = useCallback(
    (event) => {
      if (openProfile && openProfile.contains(event.target)) {
        setOpenProfile(null);
      } else {
        setOpenProfile(event.currentTarget);
      }
    },
    [setOpenProfile],
  );

  const handleProfileBtn = () => {
    return history.push(getAdminProfile());
  };

  const handleCloseProfile = useCallback(() => {
    setOpenProfile(null);
  }, [setOpenProfile]);
  return (
    <div>
      <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + ' ' + classes.search,
          }}
          inputProps={{
            placeholder: 'Search',
            inputProps: {
              'aria-label': 'Search',
            },
          }}
        />
        <Button color='white' aria-label='edit' justIcon round>
          <Search />
        </Button>
      </div>

      <Button
        color={window.innerWidth > 959 ? 'transparent' : 'white'}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label='Dashboard'
        className={classes.buttonLink}>
        <Dashboard className={classes.icons} />
        <Hidden mdUp implementation='css'>
          <p className={classes.linkText}>Dashboard</p>
        </Hidden>
      </Button>

      <Notifications />

      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? 'profile-menu-list-grow' : null}
          aria-haspopup='true'
          onClick={handleClickProfile}
          className={classes.buttonLink}>
          <Person className={classes.icons} />
          <Hidden mdUp implementation='css'>
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            ' ' +
            classes.popperNav
          }>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id='profile-menu-list-grow'
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role='menu'>
                    <MenuItem
                      onClick={handleProfileBtn}
                      className={classes.dropdownItem}>
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}>
                      Settings
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      component={Link}
                      to={RoutesPaths.Admin.Logout}
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>

      <div className={classes.username}>{currentUser.firstName + ' ' + currentUser.lastName}</div>
    </div>
  );
}
