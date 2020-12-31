import { Box, Card, CardMedia, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import useStyles from './styles/ContactUsPageStyles';

const ContactUsPage = () => {
  const classes = useStyles();

  return (
    <Grid container justify='center'>
      <Card className={classes.headerCard}>
        <CardMedia
          component='img'
          alt='Header'
          className={classes.headerCardImg}
          image={require('../../../assets/BG1@1x.png')}
          title='Header'
        />
        <CustomTypography
          variant='h3'
          fontWeight={'bold'}
          className={classes.headerCardTxt}>
          Connect With Us
        </CustomTypography>
      </Card>
      <Box className={classes.blocksContainer}>
        <Grid item xs={6} className={classes.firstSection}>
          <Box textAlign={'center'} padding={2}>
            <img
              className={classes.imgIcon}
              src={require('../../../assets/contactUs/customer_support.png')}
            />
            <CustomTypography
              variant={'body1'}
              fontWeight={'bold'}
              gutterBottom>
              Customer Support
            </CustomTypography>
            <CustomTypography
              variant={'body1'}
              fontWeight={'bold'}
              gutterBottom>
              800-585-0774
            </CustomTypography>
            <CustomTypography
              variant={'body1'}
              fontWeight={'bold'}
              gutterBottom>
              Chat with Support Manager
            </CustomTypography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box textAlign={'center'} padding={2}>
            <img
              className={classes.imgIcon}
              src={require('../../../assets/contactUs/have_project.png')}
            />
            <CustomTypography
              variant={'body1'}
              fontWeight={'bold'}
              gutterBottom>
              I have a Project
            </CustomTypography>
            <CustomTypography
              variant={'body1'}
              fontWeight={'bold'}
              gutterBottom>
              800-585-0774
            </CustomTypography>
            <CustomTypography
              variant={'body1'}
              fontWeight={'bold'}
              gutterBottom>
              Request a Meeting
            </CustomTypography>
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
              variant={'body1'}
              fontWeight={'bold'}
              gutterBottom>
              Corporate Headquarters:
            </CustomTypography>
            <CustomTypography
              variant={'body1'}
              fontWeight={'bold'}
              gutterBottom>
              nformacy
            </CustomTypography>
            <CustomTypography
              variant={'body1'}
              fontWeight={'bold'}
              gutterBottom>
              345 Park Avenue San Jose, CA 95110-2704
            </CustomTypography>
            <CustomTypography
              variant={'body1'}
              fontWeight={'bold'}
              gutterBottom>
              Tel: 408-536-6000
            </CustomTypography>
            <CustomTypography
              variant={'body1'}
              fontWeight={'bold'}
              gutterBottom>
              Fax: 408-537-6000
            </CustomTypography>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};

export default ContactUsPage;
