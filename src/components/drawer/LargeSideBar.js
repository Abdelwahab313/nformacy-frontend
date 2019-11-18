import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Redirect } from 'react-router';

const drawerWidth = '15%';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function LargeSideBar(props) {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [redirectTo, setRedirectTo] = useState();

  function handleOnClick(e) {
    function checkRouteType() {
      if (e === 'clients') {
        setRedirectTo('/clients/list');
      } else if (e === 'users') {
        setRedirectTo('/users/list');
      } else if (e === 'logout') {
        setRedirectTo('/logout');
      }
      setRedirect(true);
    }

    checkRouteType();
  }

  if (redirect) {
    return <Redirect push to={redirectTo} />;
  }
  return (
    <div className={classes.root} dir='rtl'>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor='right'
        id={'side-menu'}>
        <div className={classes.toolbar} dir={'rtl'} />
        <Divider />
        <List id={'menu-items'}>
          <ListItem
            button
            key={'الموزعين'}
            onClick={() => handleOnClick('users')}>
            <ListItemIcon>
              <LocalShippingIcon />{' '}
            </ListItemIcon>
            <ListItemText primary={'الموزعين'} />
          </ListItem>
          <ListItem
            button
            key={'العملاء'}
            onClick={() => handleOnClick('clients')}>
            <ListItemIcon>
              <AccessibilityIcon />
            </ListItemIcon>
            <ListItemText primary={'العملاء'} />
          </ListItem>
          <ListItem button key={'تسجيل الخروج'}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText
              primary={'تسجيل الخروج'}
              onClick={() => handleOnClick('logout')}
            />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
