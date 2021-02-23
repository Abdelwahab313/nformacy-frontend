import React, { Fragment } from 'react';
import { Card, CardMedia, Typography, Box, Link, Grid } from '@material-ui/core';
import useStyles from '../styles/HomePageStyles';
import { useTranslation } from 'react-i18next';
import CustomTypography from 'components/typography/Typography';
import { useAuth } from 'pages/auth/context/auth';
import authManager from 'services/authManager';
import { RoutesPaths } from 'constants/routesPath';
import warning from '../../../../assets/warning.png';

const HomeHeadBar = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const Header = authManager.isClient()
    ? require('../../../../assets/BG1@1x.png')
    : require('../../../../assets/consultant-bg.png');
  const [{ currentUser }] = useAuth();

  const onClickCompleteLater = () => {
    window.location.replace(RoutesPaths.App.FreelancerProfile);
  };

  const isCompleteLaterBanner = !currentUser.completedProfile && !authManager.isAdmin();
  return (
    <Fragment>
      <Card className={classes.headerCard}>
        <CardMedia
          component='img'
          alt='Header'
          className={classes.headerCardImg}
          image={Header}
          title='Header'
        />
        <Typography
          variant='h3'
          component='h3'
          className={classes.headerCardTxt}>
          {currentUser.firstName + ' ' + currentUser.lastName + ' Workspace'}
        </Typography>
        {!!isCompleteLaterBanner && (
          <Link
            underline='none'
            onClick={() => onClickCompleteLater()}>
            <Grid container className={classes.completeLaterBanner}>
              <Grid item md={1} className={classes.completeLaterBannerText}>
                <div className={classes.warningImgContainer}>
                  <img className={classes.warningImg} src={warning} alt="warning" />
                </div>
              </Grid>
              <Grid md={11} className={classes.completeLaterBannerText}>
                <Typography variant='subtitle1' component='h6' className={classes.warningMsg}>
                  WARNING! To start using nformacy services please complete your <span className={classes.regFormLink}>registration form</span>
                </Typography>
              </Grid>
            </Grid>
          </Link>
        )
        }
      </Card >
      <Box className={classes.profileMobile}>
        <img
          id='profilePicture'
          src={currentUser.avatar}
          className={classes.profilePictureMobile}
          alt='Profile Picture'
        />
        <CustomTypography
          align={'center'}
          gutterBottom
          variant='h5'
          fontWeight='bold'>
          {currentUser.firstName + ' ' + currentUser.lastName}
        </CustomTypography>
        <CustomTypography gutterBottom variant='body2'>
          <CustomTypography component='span'>{t('youHave')}</CustomTypography>
          <CustomTypography
            component='span'
            variant='body2'
            fontWeight='bold'
            className={classes.orangeText}>
            {` ${t('points')}`}
          </CustomTypography>
        </CustomTypography>
      </Box>
    </Fragment >
  );
};

export default HomeHeadBar;
