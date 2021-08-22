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
import DashboardIcon from '@material-ui/icons/Dashboard';

import SidebarStyles from './SidebarStyles';
import authManager from 'services/authManager';
import { calendarRoute } from 'layouts/admin/routes';
import useFetchData from 'hooks/useFetchData';
import { fetchProjects } from 'apis/projectsAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import { RoutesPaths } from 'constants/routesPath';
import ProjectDetails from 'pages/Admin/Projects/ProjectDetails';

const useStyles = makeStyles(SidebarStyles);

export default function ProjectManagerSidebar(props) {
  const classes = useStyles();
  const currentUser = authManager.retrieveCurrentUser();

  const { fetchedData: projects, isLoading } = useFetchData(() => {
    return fetchProjects();
  });

  let routes = projects.map((project) => ({
    path: RoutesPaths.Admin.ProjectDetails,
    name: project.title,
    icon: DashboardIcon,
    component: ProjectDetails,
    hasDashboardLink: false,
    projectId: project.id,
  }));

  // TODO: needs to handle
  routes.push(calendarRoute);

  // verifies if routeName is the one active (in browser input)
  // TODO: replace with active route
  function activeRoute(projectIds, projectId) {
    return false;
  }

  if (isLoading) {
    return <LoadingCircle />;
  }
  const { color, logo, image, logoText } = props;
  let links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        const itemPath = prop.path;
        let listItemClasses = classNames({
          [' ' + classes[color]]: activeRoute(itemPath),
        });

        const whiteFontClasses = classNames({
          [' ' + classes.whiteFont]: activeRoute(itemPath),
        });
        return (
          <NavLink
            to={{
              pathname: itemPath,
              key: prop.projectId,
              state: { projectId: prop.projectId },
            }}
            key={key}
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
          <img src={logo} alt='logo' className={classes.nformacySidMenuLogo} />
        </div>
        <div className={classes.mobileUsername}>
          {currentUser.firstName + ' ' + currentUser.lastName}
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

ProjectManagerSidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(['purple', 'blue', 'green', 'orange', 'red']),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
