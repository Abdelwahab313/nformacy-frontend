import React, { useCallback } from 'react';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import AdminHeader from 'components/header/admin/Header.js';
import Sidebar from 'components/sidebar/Sidebar.js';

import adminRoutes from 'layouts/admin/routes';

import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';

import bgImage from 'assets/img/sidebar-2.jpg';
import logo from 'assets/desktop_nformacy_logo.png';
import AdminRouter from 'layouts/admin/AdminRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/toastNotifications.css';
import ProjectManagerSidebar from 'components/sidebar/ProjectManagerSidebar';
import authManager from 'services/authManager';

let ps;

const useStyles = makeStyles(styles);

export default function AdminLayout({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();

  const isProjectManager = authManager.isProjectManager();

  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [setMobileOpen, mobileOpen]);

  const resizeFunction = useCallback(() => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  }, [setMobileOpen]);
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      {!!isProjectManager ? (
        <ProjectManagerSidebar
          id={'projectManagerSidebar'}
          logo={logo}
          image={bgImage}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={'blue'}
          {...rest}
        />
      ) : (
        <Sidebar
          id={'adminSidebar'}
          routes={adminRoutes.filter((route) => !!route.hasDashboardLink)}
          logo={logo}
          image={bgImage}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={'blue'}
          {...rest}
        />
      )}
      <div className={classes.mainPanel} ref={mainPanel}>
        <AdminHeader
          routes={adminRoutes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>
            <AdminRouter />
            <ToastContainer position='bottom-left' />
          </div>
        </div>
      </div>
    </div>
  );
}
