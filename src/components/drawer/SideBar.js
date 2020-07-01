import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';

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

function SideBar(props) {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState(1);
  useEffect(() => {
    if (window.location.pathname.split('/').length === 2) {
      setSelectedItem(1);
    } else if (window.location.pathname.includes('user/edit')) {
      setSelectedItem(2);
    } else if (window.location.pathname.includes('meeting')) {
      setSelectedItem(3);
    }
  }, []);

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{ paper: classes.drawerPaper }}
        id={'side-menu'}>
        <div className={classes.toolbar} dir={'rtl'} />
        <Divider />
        <List id={'menu-items'}>
          <ListItem
            id={'home'}
            button
            onClick={() => setSelectedItem(1)}
            selected={selectedItem === 1}
            key={'home'}
            component={Link}
            to={'/'}>
            <ListItemIcon>
              <HomeIcon />{' '}
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
          <ListItem
            id={'editProfile'}
            button
            onClick={() => setSelectedItem(2)}
            selected={selectedItem === 2}
            key={'editProfile'}
            component={Link}
            to={'/user/edit'}>
            <ListItemIcon>
              <AccountBoxIcon />{' '}
            </ListItemIcon>
            <ListItemText primary={'Edit Profile'} />
          </ListItem>
          <ListItem
            id={'meeting'}
            button
            onClick={() => setSelectedItem(3)}
            selected={selectedItem === 3}
            key={'Meeting'}
            component={Link}
            to={'/meeting/list'}>
            <ListItemIcon>
              <VideoCallIcon />{' '}
            </ListItemIcon>
            <ListItemText primary={'Meeting'} />
          </ListItem>

          <ListItem button key={'logout'} component={Link} to={'/logout'}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'logout'} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

export default SideBar;
