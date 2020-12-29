import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import StarsIcon from '@material-ui/icons/Stars';
import ProfilePictureMenu from 'components/header/app/ProfilePictureMenu';
import useStyles from 'components/header/app/styles/HeaderStyles';
import useLocale from '../../../hooks/localization/useLocale';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import DIRECTION from '../../../constants/direction';
import Notifications from '../admin/notifications';
import { Link } from 'react-router-dom';
import LinkText from 'components/typography/LinkText';

export default function MainHeader() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t } = useTranslation();
  const { locale, toggleLocale } = useLocale();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ScrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({behavior: 'smooth'});
  };
  const handleMobileMenuOpen = () => {};

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <div className={classes.grow} dir={DIRECTION[locale]}>
      <AppBar
        className={classes.headerBackground}
        id={'header'}
        position='static'>
        <Toolbar>
          <Link href={'/'}>
            <img
              src={require('../../../assets/desktop_nformacy_logo.svg')}
              className={classes.desktopVisible}
            />
            <img
              src={require('../../../assets/mobile_nformacy_logo.svg')}
              className={classes.mobileVisible}
            />
          </Link>
          <Link href='#' className={classes.menuItemText}>
            Home
          </Link>
          <Link href='#' className={classes.menuItemText}>
            About
          </Link>
          <LinkText onClick={()=>ScrollToSection('our_solution')} className={classes.menuItemText}>
            Solutions
          </LinkText>
          <Link href='#' className={classes.menuItemText}>
            Consultants
          </Link>
          <Link href='#' className={classes.menuItemText}>
            Knowledge Hub
          </Link>
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
              <Notifications />
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
            <Button
              id={'switchLang'}
              variant={'contained'}
              color={'primary'}
              className={classes.languageButton}
              onClick={toggleLocale}>
              {t('language')}
            </Button>
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
