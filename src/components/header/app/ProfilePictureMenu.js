import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import HelpIcon from '@material-ui/icons/Help';
import { darkBlue } from 'styles/colors';
import { RoutesPaths } from 'constants/routesPath';
import authManager from 'services/authManager';
import DashboardIcon from '@material-ui/icons/Dashboard';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { getAdminDashboardHomePage } from 'services/navigation';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid',
    backgroundColor: darkBlue,
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
      onClose={handleClose}>
      <MenuItem
        id={'home'}
        key={'home'}
        onClick={() => handleClose()}
        component={Link}
        to={RoutesPaths.App.Dashboard}>
        <ListItemIcon>
          <HomeIcon color={'secondary'} />
        </ListItemIcon>
        <StyledListText primary={'Home'} />
      </MenuItem>

      <MenuItem
        id={'editProfile'}
        key={'editProfile'}
        onClick={() => handleClose()}
        component={Link}
        to={'/user/edit'}>
        <ListItemIcon>
          <AccountBoxIcon color={'secondary'} />
        </ListItemIcon>
        <StyledListText primary={'Profile'} />
      </MenuItem>

      {!authManager.isClient() && (
        <MenuItem
          id={'questionRoaster'}
          key={'QuestionRoaster'}
          onClick={() => handleClose()}
          component={Link}
          to={'/questions'}>
          <ListItemIcon>
            <HelpIcon color={'secondary'} />
          </ListItemIcon>
          <StyledListText primary={'Question Roaster'} />
        </MenuItem>
      )}

      {authManager.isClient() && (
        <MenuItem
          id={'services'}
          key={'Services'}
          onClick={() => handleClose()}
          component={Link}
          to={RoutesPaths.App.Services}>
          <ListItemIcon>
            <BusinessCenterIcon color={'secondary'} />
          </ListItemIcon>
          <StyledListText primary={'Services'} />
        </MenuItem>
      )}

      {authManager.isNormalUser() && (
        <MenuItem
          id={'services'}
          key={'Answers'}
          onClick={() => handleClose()}
          component={Link}
          to={RoutesPaths.App.ActivitiesList}>
          <ListItemIcon>
            <BusinessCenterIcon color={'secondary'} />
          </ListItemIcon>
          <StyledListText primary={'Answers'} />
        </MenuItem>
      )}

      {authManager.isAdmin() && (
        <MenuItem
          id={'adminDashboard'}
          key={'Admin Dashboard'}
          onClick={() => handleClose()}
          component={Link}
          to={getAdminDashboardHomePage()}>
          <ListItemIcon>
            <DashboardIcon color={'secondary'} />
          </ListItemIcon>
          <StyledListText primary={'Admin Dashboard'} />
        </MenuItem>
      )}

      <MenuItem
        id={'changePassword'}
        key={'Change Password'}
        onClick={() => handleClose()}
        component={Link}
        to={RoutesPaths.App.ChangePassword}>
        <ListItemIcon>
          <VpnKeyIcon color={'secondary'} />
        </ListItemIcon>
        <StyledListText primary={'Change Password'} />
      </MenuItem>

      <MenuItem
        id={'logout'}
        key={'logout'}
        onClick={() => handleClose()}
        component={Link}
        to={'/logout'}>
        <ListItemIcon>
          <ExitToAppIcon color={'secondary'} />
        </ListItemIcon>
        <StyledListText primary={'logout'} />
      </MenuItem>
    </StyledMenu>
  );
};

export default ProfilePictureMenu;
