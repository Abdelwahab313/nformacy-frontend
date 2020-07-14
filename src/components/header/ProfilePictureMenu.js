import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { pink } from '../../styles/colors';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid',
    backgroundColor: pink,
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledListText = withStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
  },
}))(ListItemText);

const ProfilePictureMenu = ({ menuId, anchorEl, handleClose }) => {
  return (
    <StyledMenu
      id={menuId}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem
        id={'home'}
        key={'home'}
        onClick={() => handleClose()}
        component={Link}
        to={'/'}>
        <ListItemIcon>
          <HomeIcon color={'secondary'}/>
        </ListItemIcon>
        <StyledListText primary={'Home'}/>
      </MenuItem>

      <MenuItem
        id={'editProfile'}
        key={'editProfile'}
        onClick={() => handleClose()}
        component={Link}
        to={'/user/edit'}>
        <ListItemIcon>
          <AccountBoxIcon color={'secondary'}/>
        </ListItemIcon>
        <StyledListText primary={'Profile'}/>
      </MenuItem>

      <MenuItem
        id={'meeting'}
        key={'Meeting'}
        onClick={() => handleClose()}
        component={Link}
        to={'/meeting/list'}>
        <ListItemIcon>
          <VideoCallIcon color={'secondary'}/>
        </ListItemIcon>
        <StyledListText primary={'Meeting'}/>
      </MenuItem>

      <MenuItem
        id={'logout'}
        key={'logout'}
        onClick={() => handleClose()}
        component={Link}
        to={'/logout'}>
        <ListItemIcon>
          <ExitToAppIcon color={'secondary'}/>
        </ListItemIcon>
        <StyledListText primary={'logout'}/>
      </MenuItem>
    </StyledMenu>
  );
};

export default ProfilePictureMenu;