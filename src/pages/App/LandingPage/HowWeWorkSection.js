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
      className={classes.landingSectionsContainerPadding}>
      <Grid item xs={12}>
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
      <Grid item xs={12} className={classes.subTextMargin}>
        <Grid container direction='row' justify='center' className={classes.subTextMargin}>
          {/* sign_up */}
          <Grid item xs={4} md={2}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Sign_up.svg')}
              />
              <CustomTypography variant='h6' fontWeight='bold'>
                Sign up
              </CustomTypography>
              <CustomTypography variant='body1' fontWeight='light'>
                Fill in the short registration form and get instant access to
                nformacy network of experts.
              </CustomTypography>
            </Box>
          </Grid>
          {/* end sign_up */}
          {/* Access Desk Space */}
          <Grid item xs={4} md={2}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Access_Desk_Space.svg')}
              />
              <CustomTypography variant='h6' fontWeight='bold'>
                Access Desk Space
              </CustomTypography>
              <CustomTypography variant='body1' fontWeight='light'>
                Access your personal desk space and start receiving business
                publications in the fields of your interest.
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Access Desk Space */}
          {/* Ask Questions */}
          <Grid item xs={4} md={2}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Ask_Questions.svg')}
              />
              <CustomTypography variant='h6' fontWeight='bold'>
                Ask Questions
              </CustomTypography>
              <CustomTypography variant='body1' fontWeight='light'>
                Ask any business question and start receiving real time
                answerers from our pool of experts.
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Ask Questions */}
          {/* Choose your Services */}
          <Grid item xs={4} md={2}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Choose_your_Services.svg')}
              />
              <CustomTypography variant='h6' fontWeight='bold'>
                Choose your Services
              </CustomTypography>
              <CustomTypography variant='body1' fontWeight='light'>
                Choose your solution and submit your request which will go
                through a leading screening process to match you with a short
                list of best fit consultants to choose from your ideal match.
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Choose your Services */}
          {/* Pay */}
          <Grid item xs={4} md={2}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Pay.svg')}
              />
              <CustomTypography variant='h6' fontWeight='bold'>
                Pay
              </CustomTypography>
              <CustomTypography variant='body1' fontWeight='light'>
                Charge your wallet and buy bundles and packages according to
                your needs and budget.
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Pay */}
          {/* Manage your Space */}
          <Grid item xs={4} md={2}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Manage_your_Space.svg')}
              />
              <CustomTypography variant='h6' fontWeight='bold'>
                Manage your Space
              </CustomTypography>
              <CustomTypography variant='body1' fontWeight='light'>
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
