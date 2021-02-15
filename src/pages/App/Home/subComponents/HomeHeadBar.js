import React, { Fragment } from 'react';
import { Card, CardMedia, Typography, Box, Link } from '@material-ui/core';
import useStyles from '../styles/HomePageStyles';
import { useTranslation } from 'react-i18next';
import CustomTypography from 'components/typography/Typography';
import { useAuth } from 'pages/auth/context/auth';
import authManager from 'services/authManager';
import { RoutesPaths } from 'constants/routesPath';

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
        {!currentUser.completedProfile && (
          <Link
            underline='none'
            onClick={() => onClickCompleteLater()}>
            <Typography variant='subtitle1' component='h3' className={classes.completeLaterBanner}>
              To start using nformacy services please complete your registration form
            </Typography>
          </Link>
        )}
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
