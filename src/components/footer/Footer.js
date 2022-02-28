import { Box, Divider, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import classNames from 'clsx';
import CopyrightIcon from '@material-ui/icons/Copyright';
import { greyDividerStyle } from 'styles/formsStyles';
import useStyles from './styles/FooterStyles';
import LinkText from 'components/typography/LinkText';
import { RoutesPaths } from 'constants/routesPath';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';

  return (
    <Grid
      container
      direction='row'
      justify='center'
      className={classes.footerContainer}>
      <Grid item xs={6} md={3}>
        <Box textAlign={'center'} mb={5}>
          <CustomTypography variant={'body1'} fontWeight={'bold'} gutterBottom>
            {t('contactUs')}
          </CustomTypography>
          <CustomTypography variant={'body1'}>info@nformacy.com</CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={6} md={3}>
        <Box textAlign={'center'}>
          <CustomTypography variant={'body1'} fontWeight={'bold'} gutterBottom>
            {t('socialMedia')}
          </CustomTypography>
          <a href={'#'} className={classes.socialMediaIcon}>
            <img src={require('../../assets/landing/Facebook.svg')} />
          </a>
          <a href={'#'} className={classes.socialMediaIcon}>
            <img src={require('../../assets/landing/Instagram.svg')} />
          </a>
          <a href={'#'} className={classes.socialMediaIcon}>
            <img src={require('../../assets/landing/Twitter.svg')} />
          </a>
        </Box>
      </Grid>
      <Grid item xs={6} md={3}>
        <Box textAlign={'center'}>
          <CustomTypography variant={'body1'} fontWeight={'bold'} gutterBottom>
            {t('privacyPolicy')}
          </CustomTypography>
          <LinkText to={RoutesPaths.App.TermsAndConditions}>
            <CustomTypography variant={'body1'}>
              {t('termsAndConditions')}
            </CustomTypography>
          </LinkText>
        </Box>
      </Grid>
      <Divider
        variant='middle'
        style={greyDividerStyle}
        className={classes.footerSectionDivider}
      />
      <Box>
        <a href={'#'}>
          <img
            src={require('../../assets/desktop_nformacy_logo.svg')}
            className={classes.desktopVisible}
          />
          <img
            src={require('../../assets/mobile_nformacy_logo.svg')}
            className={classes.mobileVisible}
          />
        </a>
        <CustomTypography
          align={'center'}
          variant='body1'
          className={classNames(classes.flexClass, {
            [classes.flexClassAr]: isArlang,
          })}>
          <CopyrightIcon />
          <div className={classes.dateClass}> {(new Date().getFullYear())}</div>
           {t('allRightsReserved')}
        </CustomTypography>
      </Box>
    </Grid>
  );
};

export default Footer;
