import { Box, Grid } from '@material-ui/core';
import SubmitButton from 'components/buttons/SubmitButton';
import PageContainer from 'components/grid/PageContainer';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FrontBanner from '../LandingPage/subComponents/FrontBanner';
import useStyles from './styles/ContactUsPageStyles';

const ContactUsPage = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Grid container justify='center'>
        <FrontBanner
          imageClassName={classes.bannerImageStyles}
          imageSource={require('../../../assets/landing/contact_us_page.png')}
          title={t('connectWithUs')}
          titleClassName={classes.bannerTitle}
        />
        <Box className={classes.blocksContainer}>
          <Grid item xs={6} className={classes.firstSection}>
            <Box textAlign={'center'} padding={2}>
              <img
                className={classes.imgIcon}
                src={require('../../../assets/contactUs/customer_support.png')}
              />
              <CustomTypography
                variant={'body2'}
                fontWeight={'bold'}
                gutterBottom>
                {t('customerSupport')}
              </CustomTypography>
              <CustomTypography
                variant={'body2'}
                fontWeight={'bold'}
                gutterBottom>
                800-585-0774
              </CustomTypography>
              <SubmitButton
                disabled
                id={'chatBtn'}
                onClick={() => {}}
                className={[classes.mainCtaBtn, classes.noTextTransform]}
                buttonText={
                  <CustomTypography variant={'body2'} fontWeight={'bold'}>
                    {t('chatWithSupportManager')}
                  </CustomTypography>
                }
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign={'center'} padding={2}>
              <img
                className={classes.imgIcon}
                src={require('../../../assets/contactUs/have_project.png')}
              />
              <CustomTypography
                variant={'body2'}
                fontWeight={'bold'}
                gutterBottom>
                {t('haveProject')}
              </CustomTypography>
              <CustomTypography
                variant={'body2'}
                fontWeight={'bold'}
                gutterBottom>
                800-585-0774
              </CustomTypography>
              <SubmitButton
                id={'serveBtn'}
                onClick={() => {}}
                className={[classes.mainCtaBtn, classes.noTextTransform]}
                buttonText={
                  <CustomTypography variant={'body2'} fontWeight={'bold'}>
                    {t('requestMeeting')}
                  </CustomTypography>
                }
              />
            </Box>
          </Grid>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Grid item xs={6}>
            <Box textAlign={'right'} padding={2}>
              <img
                className={classes.imgIcon}
                src={require('../../../assets/contactUs/corporate.png')}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign={'left'} padding={2}>
              <CustomTypography
                variant={'body2'}
                fontWeight={'bold'}
                gutterBottom>
                {t('corporateHeadquarters')}
              </CustomTypography>
              <CustomTypography
                variant={'body2'}
                fontWeight={'bold'}
                gutterBottom>
                nformacy
              </CustomTypography>
              <CustomTypography
                variant={'body2'}
                fontWeight={'bold'}
                gutterBottom>
                345 Park Avenue San Jose, CA 95110-2704
              </CustomTypography>
              <CustomTypography
                variant={'body2'}
                fontWeight={'bold'}
                gutterBottom>
                {t('tel')} 408-536-6000
              </CustomTypography>
              <CustomTypography
                variant={'body2'}
                fontWeight={'bold'}
                gutterBottom>
                {t('fax')} 408-537-6000
              </CustomTypography>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </PageContainer>
  );
};

export default ContactUsPage;
