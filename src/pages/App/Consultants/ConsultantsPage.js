import { Box, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ConsultantsJoinReasons from '../Home/subComponents/ConsultantsJoinReasons';
import ServeYouBtnSection from '../LandingPage/ServeYouBtnSection';
import useStyles from './styles/ConsultantsPageStyles';
import ConsultantsPageStatistics from '../LandingPage/ConsultantsPageStatistics';
import FrontBanner from '../LandingPage/subComponents/FrontBanner';

const ConsultantsPage = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container justify='center'>
      <FrontBanner
        imageClassName={classes.bannerImageStyles}
        imageSource={require('../../../assets/head_heads.png')}
        title={t('experts')}
      />
      <Grid
        container
        direction='row'
        justify='center'
        className={classes.landingSectionsContainerPadding}>
        <Grid item xs={10} md={12}>
          <Box textAlign='center' marginTop={5}>
            <CustomTypography variant='h4' fontWeight='bold'>
              {t('joinNformacy')}
            </CustomTypography>
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.subTextMargin}>
          <ConsultantsJoinReasons />
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justify='center'
        className={[
          classes.landingSectionsContainerPadding,
          classes.lighterGrayContainer,
        ]}>
        <Grid item xs={10} md={12}>
          <Box textAlign='center'>
            <CustomTypography variant='h4' fontWeight='bold'>
              {t('WhoNformacyExpert')}
            </CustomTypography>
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.subTextMargin}></Grid>
        <Grid container justify='space-between'>
          <Grid item xs={12} md={6}>
            <Box padding={5} className={classes.expertsBox}>
              <CustomTypography
                variant='h5'
                fontWeight='bold'
                gutterBottom
                className={classes.darkBlueText}>
                Ethical
              </CustomTypography>
              <CustomTypography variant='body1' fontWeight='light'>
                Ethical in his/her words and actions, and treats information
                with high integrity
              </CustomTypography>
            </Box>
            <Box padding={5} className={classes.expertsBox}>
              <CustomTypography
                variant='h5'
                fontWeight='bold'
                gutterBottom
                className={classes.darkBlueText}>
                Passionate
              </CustomTypography>
              <CustomTypography variant='body1' fontWeight='light'>
                Passionate and enthusiastic about business transformation and
                new ways of doing work
              </CustomTypography>
            </Box>
            <Box padding={5} className={classes.expertsBox}>
              <CustomTypography
                variant='h5'
                fontWeight='bold'
                gutterBottom
                className={classes.darkBlueText}>
                Original
              </CustomTypography>
              <CustomTypography variant='body1' fontWeight='light'>
                Original in his/her ideas and forward thinker
              </CustomTypography>
            </Box>
            <Box padding={5} className={classes.expertsBox}>
              <CustomTypography
                variant='h5'
                fontWeight='bold'
                gutterBottom
                className={classes.darkBlueText}>
                Reliable
              </CustomTypography>
              <CustomTypography variant='body1' fontWeight='light'>
                Reliable and takes ownership to make things happen
              </CustomTypography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box className={classes.expertImgBox_1}>
              <img
                className={classes.expertImg}
                src={'https://via.placeholder.com/260x270'}
              />
            </Box>
            <Box className={classes.expertImgBox_1}>
              <img
                className={classes.expertImg}
                src={'https://via.placeholder.com/260x380'}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box className={classes.expertImgBox_2}>
              <img
                className={classes.expertImg}
                src={'https://via.placeholder.com/260x380'}
              />
            </Box>
            <Box className={classes.expertImgBox_2}>
              <img
                className={classes.expertImg}
                src={'https://via.placeholder.com/260x270'}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <ConsultantsPageStatistics />
      <ServeYouBtnSection />
    </Grid>
  );
};

export default ConsultantsPage;
