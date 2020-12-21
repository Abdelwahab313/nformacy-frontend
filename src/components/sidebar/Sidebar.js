/*eslint-disable*/
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// core components
import AdminNavbarLinks from 'components/header/admin/AdminNavbarLinks.js';
import { PermissibleRender } from '@brainhubeu/react-permissible';

import authManager from '../../services/authManager';
import SidebarStyles from './SidebarStyles';

const useStyles = makeStyles(SidebarStyles);

export default function Sidebar(props) {
  const classes = useStyles();
  const { user } = authManager.retrieveUserToken();
  const navBarPermissions = user.permissions.map((perm) => perm.split(':')[0]);
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1;
  }

  const { color, logo, image, logoText, routes } = props;
  const getSingularName = (string) => {
    if (string.endsWith('s')) {
      return string.slice(0, string.length - 1);
    }
    return string;
  };
  let links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        const itemPath = prop.path;
        let listItemClasses;
        listItemClasses = classNames({
          [' ' + classes[color]]: activeRoute(itemPath),
        });

        const whiteFontClasses = classNames({
          [' ' + classes.whiteFont]: activeRoute(itemPath),
        });
        return (
          <PermissibleRender
            key={key}
            oneperm={true}
            userPermissions={navBarPermissions}
            requiredPermissions={[getSingularName(prop.name), 'all']}>
            <NavLink
              to={itemPath}
              className={classes.item}
              activeClassName='active'>
              <ListItem button className={classes.itemLink + listItemClasses}>
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive,
                  })}
                />
                <ListItemText
                  primary={prop.name}
                  className={classNames(classes.itemText, whiteFontClasses, {
                    [classes.itemTextRTL]: props.rtlActive,
                  })}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          </PermissibleRender>
        );
      })}
    </List>
  );
  let brand = (
    <div className={classes.logo}>
      <a
        href=''
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive,
        })}>
        <div className={classes.logoImage}>
          <img src={logo} alt='logo' className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div id={props.id}>
      <Hidden mdUp implementation='css'>
        <Drawer
          variant='temporary'
          anchor={props.rtlActive ? 'left' : 'right'}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}>
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation='css'>
        <Drawer
          anchor={props.rtlActive ? 'right' : 'left'}
          variant='permanent'
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}>
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(['purple', 'blue', 'green', 'orange', 'red']),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
