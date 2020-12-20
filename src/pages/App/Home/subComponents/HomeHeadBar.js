import React, { Fragment } from 'react';
import { Card, CardMedia, Typography, Box } from '@material-ui/core';
import useStyles from '../styles/HomePageStyles';
import { useTranslation } from 'react-i18next';
import CustomTypography from 'components/typography/Typography';
import { useAuth } from 'pages/auth/context/auth';
import authManager from 'services/authManager';

const HomeHeadBar = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const Header = authManager.isClient()
    ? require('../../../../assets/BG1@1x.png')
    : require('../../../../assets/consultant-bg.png');
  const [{ currentUser }] = useAuth();

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
          {currentUser.firstName + ' ' + currentUser.lastName + ' Work-Space'}
        </Typography>
      </Card>
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
    </Fragment>
  );
};

export default HomeHeadBar;
