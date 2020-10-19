import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import StarsIcon from '@material-ui/icons/Stars';
import ProfilePictureMenu from 'components/Header/app/ProfilePictureMenu';
import useStyles from 'components/Header/app/styles/HeaderStyles';
import useLocale from '../../../hooks/localization/useLocale';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

export default function MainHeader() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { changeLocale } = useLocale();
  const { t } = useTranslation();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMobileMenuOpen = () => {};

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <div className={classes.grow}>
      <AppBar id={'header'} position='static'>
        <Button id={'switchLang'} onCLick={() => changeLocale('ar')}>
          {t('language')}
        </Button>
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label='show 4 new mails' color='inherit'>
              <StarsIcon />
            </IconButton>

            <IconButton aria-label='show 17 new notifications' color='inherit'>
              <Badge badgeContent={17} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'>
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'>
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <ProfilePictureMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        menuId={menuId}
      />
    </div>
  );
}
