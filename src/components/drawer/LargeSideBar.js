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
import { Link } from 'react-router-dom';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

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

function LargeSideBar(props) {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState();
  useEffect(() => {
    if (
      window.location.pathname.includes('users') ||
      window.location.pathname.split('/').length === 2
    ) {
      setSelectedItem(1);
    } else if (window.location.pathname.includes('clients')) {
      setSelectedItem(2);
    } else if (window.location.pathname.includes('products')) {
      setSelectedItem(3);
    } else if (window.location.pathname.includes('sales')) {
      setSelectedItem(4);
    }
  }, []);
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
            id={'reps'}
            button
            onClick={() => setSelectedItem(1)}
            selected={selectedItem === 1}
            key={'الموزعين'}
            component={Link}
            to={'/users/list'}>
            <ListItemIcon>
              <LocalShippingIcon />{' '}
            </ListItemIcon>
            <ListItemText primary={'الموزعين'} />
          </ListItem>
          <ListItem
            id={'clients'}
            button
            onClick={() => setSelectedItem(2)}
            selected={selectedItem === 2}
            key={'العملاء'}
            component={Link}
            to={'/clients/list'}>
            <ListItemIcon>
              <AccessibilityIcon />
            </ListItemIcon>
            <ListItemText primary={'العملاء'} />
          </ListItem>
          <ListItem
            id={'products'}
            button
            onClick={() => setSelectedItem(3)}
            selected={selectedItem === 3}
            key={'البضائع'}
            component={Link}
            to={'/products/list'}>
            <ListItemIcon>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary={'البضائع'} />
          </ListItem>
          <ListItem
            id={'sales'}
            button
            onClick={() => setSelectedItem(4)}
            selected={selectedItem === 4}
            key={'المبيعات'}
            component={Link}
            to={'/sales/list'}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary={'المبيعات'} />
          </ListItem>
          <ListItem button key={'تسجيل الخروج'} component={Link} to={'/logout'}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'تسجيل الخروج'} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

export default LargeSideBar;
