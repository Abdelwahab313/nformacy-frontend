import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ProfilePictureMenu from 'components/header/app/ProfilePictureMenu';
import useStyles from 'components/header/app/styles/HeaderStyles';
import useLocale from '../../../hooks/localization/useLocale';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import DIRECTION from '../../../constants/direction';
import Notifications from '../admin/notifications';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { RoutesPaths } from 'constants/routesPath';
import authManager from 'services/authManager';
import SubmitButton from 'components/buttons/SubmitButton';
import { useHistory } from 'react-router';
import AppMenu from './AppMenu';
import appRoutes from 'layouts/app/routes';

export default function MainHeader() {
  const menuList = appRoutes.filter((route) => !!route.hasDashboardLink);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t } = useTranslation();
  const { locale, toggleLocale } = useLocale();
  const location = useLocation();
  const authToken = authManager.retrieveUserToken();
  const history = useHistory();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const showHeaderNav =
    location.pathname === RoutesPaths.App.LandingPage ||
    location.pathname === RoutesPaths.App.ContactUs ||
    location.pathname === RoutesPaths.App.Solutions ||
    location.pathname === RoutesPaths.App.About ||
    location.pathname === RoutesPaths.App.Consultants ||
    location.pathname === RoutesPaths.App.TermsAndConditions ||
    location.pathname === RoutesPaths.App.KnowHub;
  return (
    <div className={classes.grow} dir={DIRECTION[locale]}>
      <AppBar
        className={classes.headerBackground}
        id={'header'}
        position='fixed'>
        <Toolbar>
          <AppMenu menuList={menuList} />
          <Box className={classes.mobileLogoContainer}>
            <Link
              to={RoutesPaths.App.LandingPage}
              className={classes.logoImage}>
              <img
                src={require('../../../assets/desktop_nformacy_logo.svg')}
                width={140}
                className={classes.desktopVisible}
              />
              <img
                src={require('../../../assets/mobile_nformacy_logo.svg')}
                className={classes.mobileVisible}
              />
            </Link>
          </Box>
          <Box className={classes.sectionSmallView}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Box>
          {showHeaderNav && (
            <Box className={classes.sectionDesktop}>
              <NavLink
                exact
                to={RoutesPaths.App.LandingPage}
                className={classes.menuItemText}
                activeClassName={classes.active}>
                {t('Home')}
              </NavLink>
              <NavLink
                to={RoutesPaths.App.About}
                className={classes.menuItemText}
                activeClassName={classes.active}>
                {t('about')}
              </NavLink>
              <NavLink
                to={RoutesPaths.App.Solutions}
                className={classes.menuItemText}
                activeClassName={classes.active}>
                {t('solutions')}
              </NavLink>
              <NavLink
                to={RoutesPaths.App.Consultants}
                className={classes.menuItemText}
                activeClassName={classes.active}>
                {t('experts')}
              </NavLink>
              <NavLink
                to={RoutesPaths.App.KnowHub}
                className={classes.menuItemText}
                activeClassName={classes.active}>
                {t('knowledgeHub')}
              </NavLink>
              <NavLink
                to={RoutesPaths.App.ContactUs}
                className={classes.menuItemText}
                activeClassName={classes.active}>
                {t('connect')}
              </NavLink>
            </Box>
          )}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {authToken ? (
              <Box>
                <IconButton
                  aria-label='show 17 new notifications'
                  color='inherit'>
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
              </Box>
            ) : (
                <Box>
                  <SubmitButton
                    id={'LoginBtn'}
                    onClick={() => history.push(RoutesPaths.App.Login)}
                    className={classes.orangeCtaBtn}
                    buttonText={'login'}
                  />
                </Box>
              )}
            <Button
              id={'switchLang'}
              color={'primary'}
              className={classes.languageButton}
              onClick={toggleLocale}>
              {t('language')}
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
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
