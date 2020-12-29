import { Box, Divider, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import CopyrightIcon from '@material-ui/icons/Copyright';
import { greyDividerStyle } from 'styles/formsStyles';
import useStyles from './styles/FooterStyles';

const Footer = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction='row'
      justify='center'
      className={classes.footerContainer}>
      <Grid item xs={6} md={3}>
        <Box textAlign={'center'} mb={5}>
          <CustomTypography variant={'h6'} gutterBottom>Contact Us</CustomTypography>
          <CustomTypography variant={'body1'}>Rada@Rada.life</CustomTypography>
          <CustomTypography variant={'body1'}>+962-778002882</CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={6} md={3}>
        <Box textAlign={'center'} mb={5}>
          <CustomTypography variant={'h6'} gutterBottom>Visit Us</CustomTypography>
          <CustomTypography variant={'body1'}>Address here</CustomTypography>
          <CustomTypography variant={'body1'}>Amman / Jordan</CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={6} md={3}>
        <Box textAlign={'center'}>
          <CustomTypography variant={'h6'} gutterBottom>Social Media</CustomTypography>
          <Link href={'#'} className={classes.socialMediaIcon}>
            <img src={require('../../assets/landing/Facebook.svg')} />
          </Link>
          <Link href={'#'} className={classes.socialMediaIcon}>
            <img src={require('../../assets/landing/Instagram.svg')} />
          </Link>
          <Link href={'#'} className={classes.socialMediaIcon}>
            <img src={require('../../assets/landing/Twitter.svg')} />
          </Link>
        </Box>
      </Grid>
      <Grid item xs={6} md={3}>
        <Box textAlign={'center'}>
          <CustomTypography variant={'h6'} gutterBottom>Privacy Policy</CustomTypography>
          <CustomTypography variant={'body1'}>
            Terms and conditions
          </CustomTypography>
        </Box>
      </Grid>
      <Divider
        variant='middle'
        style={greyDividerStyle}
        className={classes.footerSectionDivider}
      />
      <Box>
        <Link href={'#'}>
          <img
            src={require('../../assets/desktop_nformacy_logo.svg')}
            className={classes.desktopVisible}
          />
          <img
            src={require('../../assets/mobile_nformacy_logo.svg')}
            className={classes.mobileVisible}
          />
        </Link>
        <CustomTypography variant='body1' className={classes.flexClass}>
          <CopyrightIcon />
          2020 by NFormacy. All rights reserved.
        </CustomTypography>
      </Box>
    </Grid>
  );
};

export default Footer;
