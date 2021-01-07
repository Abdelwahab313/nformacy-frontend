import { Box, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import useStyles from './styles/LandingPageStyles';

const HowWeWorkSection = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction='row'
      justify='center'
      className={[
        classes.landingSectionsContainerPadding,
        classes.desktopVisible,
      ]}>
      <Grid item xs={10} md={12}>
        <Box textAlign='center'>
          <CustomTypography variant='h4' fontWeight='bold'>
            How we Work
          </CustomTypography>
          <CustomTypography variant='h5' className={classes.subTextMargin}>
            nformacy is your second office, you only need to sign up to access
            your dynamic personalized Work-Space and start interacting with
            high-end subject matter experts in all areas of business.
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={12} className={classes.stepsContainerMargin}>
        <Grid container direction='row' justify='space-between'>
          {/* sign_up */}
          <Grid item md={2}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Sign_up.svg')}
              />
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                Sign up
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={[
                  classes.workSubTextPadding,
                  classes.desktopVisible,
                ]}>
                Fill in the short registration form and get instant access to
                nformacy network of experts.
              </CustomTypography>
            </Box>
          </Grid>
          {/* end sign_up */}
          {/* Access Desk Space */}
          <Grid item md={2}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Access_Desk_Space.svg')}
              />
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                Access Desk Space
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={[
                  classes.workSubTextPadding,
                  classes.desktopVisible,
                ]}>
                Access your personal desk space and start receiving business
                publications in the fields of your interest.
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Access Desk Space */}
          {/* Choose your Services */}
          <Grid item md={2}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Choose_your_Services.svg')}
              />
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                Choose your Services
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={[
                  classes.workSubTextPadding,
                  classes.desktopVisible,
                ]}>
                Choose your solution and submit your request which will go
                through a leading screening process to match you with a short
                list of best fit consultants to choose from your ideal match.
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Choose your Services */}
          {/* Pay */}
          <Grid item md={2}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Pay.svg')}
              />
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                Pay
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={[
                  classes.workSubTextPadding,
                  classes.desktopVisible,
                ]}>
                Charge your wallet and buy bundles and packages according to
                your needs and budget.
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Pay */}
          {/* Manage your Space */}
          <Grid item md={2}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Manage_your_Space.svg')}
              />
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                Manage your Space
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={[
                  classes.workSubTextPadding,
                  classes.desktopVisible,
                ]}>
                Access and track your nformacy activities, requests, and
                assignments. Get all your advisory needs in one view.
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Manage your Space */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HowWeWorkSection;
