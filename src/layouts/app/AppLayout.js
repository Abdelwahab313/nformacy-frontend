import React, { Fragment } from 'react';
import { Fab, makeStyles, Toolbar, Zoom } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import AppHeader from 'components/header/app/Header';
import Footer from 'components/footer/Footer';
import { lightOrange, white } from 'styles/colors';
import { ToastContainer } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: '700px',
    width: '100%',
    height: '100%',
    marginTop: 80,
    [theme.breakpoints.down('md')]: {
      marginTop: 72,
    },
  },
  toTopIcon: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  topBar: {
    minHeight: 0,
  },
  btnScroll: {
    background: lightOrange,
    color: white,
  },
}));
function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role='presentation'
        className={classes.toTopIcon}>
        {children}
      </div>
    </Zoom>
  );
}
function AppLayout({ children, props }) {
  const classes = useStyles();
  return (
    <Fragment>
      <AppHeader />
      <Toolbar className={classes.topBar} id='back-to-top-anchor' />
      <div className={classes.root}>{children}</div>
      <Footer />
      <ToastContainer position='bottom-left' />
      <ScrollTop {...props}>
        <Fab className={classes.btnScroll} color='secondary' size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Fragment>
  );
}

export default AppLayout;
