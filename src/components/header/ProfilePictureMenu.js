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

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const ProfilePictureMenu = ({ menuId, anchorEl, handleClose }) => {
  return (
    <StyledMenu
      id={menuId}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <StyledMenuItem
        id={'home'}
        key={'home'}
        onClick={() => handleClose()}
        component={Link}
        to={'/'}>
        <ListItemIcon>
          <HomeIcon/>
        </ListItemIcon>
        <ListItemText primary={'Home'}/>
      </StyledMenuItem>

      <StyledMenuItem
        id={'editProfile'}
        key={'editProfile'}
        onClick={() => handleClose()}
        component={Link}
        to={'/user/edit'}>
        <ListItemIcon>
          <AccountBoxIcon/>
        </ListItemIcon>
        <ListItemText primary={'Profile'}/>
      </StyledMenuItem>

      <StyledMenuItem
        id={'meeting'}
        key={'Meeting'}
        onClick={() => handleClose()}
        component={Link}
        to={'/meeting/list'}>
        <ListItemIcon>
          <VideoCallIcon/>
        </ListItemIcon>
        <ListItemText primary={'Meeting'}/>
      </StyledMenuItem>

      <StyledMenuItem
        id={'logout'}
        key={'logout'}
        onClick={() => handleClose()}
        component={Link}
        to={'/logout'}>
        <ListItemIcon>
          <ExitToAppIcon/>
        </ListItemIcon>
        <ListItemText primary={'logout'}/>
      </StyledMenuItem>
    </StyledMenu>
  );
};

export default ProfilePictureMenu;