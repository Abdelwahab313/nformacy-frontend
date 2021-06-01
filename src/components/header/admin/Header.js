import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// core components
import AdminNavbarLinks from 'components/header/admin/AdminNavbarLinks.js';

import styles from 'assets/jss/material-dashboard-react/components/headerStyle.js';
import Grid from '@material-ui/core/Grid';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';

const useStyles = makeStyles(styles);

const Header = (props) => {
  const classes = useStyles();
  const makeBrand = useCallback(() => {
    let name;
    props.routes.map((prop) => {
      if (window.location.href.indexOf(prop.path) !== -1) {
        name = prop.name;
      }
      return null;
    });
    return name;
  }, []);

  const { color } = useMemo(() => props, [props]);
  const appBarClasses = useMemo(
    () =>
      classNames({
        [' ' + classes[color]]: color,
      }),
    [],
  );
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Grid className={classes.title}>
            <BreadcrumbsCustomSeparator pageName={makeBrand()} />
          </Grid>
        </div>
        <Hidden smDown implementation='css'>
          <AdminNavbarLinks />
        </Hidden>
        <Hidden mdUp implementation='css'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={props.handleDrawerToggle}>
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};

export default Header;
