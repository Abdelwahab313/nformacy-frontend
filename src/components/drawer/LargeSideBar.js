import React, { useState } from 'react';
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
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';

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
              <AccessibilityIcon />
            </ListItemIcon>
            <ListItemText primary={'البضائع'} />
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
