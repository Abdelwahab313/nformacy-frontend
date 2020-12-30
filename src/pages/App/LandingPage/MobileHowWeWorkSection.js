import { Box, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import useStyles from './styles/LandingPageStyles';

const MobileHowWeWorkSection = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction='row'
      justify='center'
      className={[
        classes.landingSectionsContainerPadding,
        classes.mobileHowWorkVisible,
      ]}>
      <Grid item xs={4}>
        <Box textAlign='center'>
          <CustomTypography variant='h4' fontWeight='bold'>
            How we Work
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={8} className={classes.stepsContainerMargin}>
        <Grid container direction='row' justify='center'>
          {/* sign_up */}
          <Grid item xs={12}>
            <Box
              textAlign='center'
              className={[classes.mobileStep, classes.mobileFirstStep]}>
              <img
                className={classes.MobileHowWorkIcon}
                src={require('../../../assets/landing/Sign_up.svg')}
              />
              <CustomTypography
                variant='body2'
                fontWeight='bold'
                className={classes.MobileWorkMainTextPadding}>
                Sign up
              </CustomTypography>
            </Box>
          </Grid>
          {/* end sign_up */}
          {/* Access Desk Space */}
          <Grid item xs={12}>
            <Box
              textAlign='center'
              className={[classes.mobileStep, classes.mobileSecondStep]}>
              <img
                className={classes.MobileHowWorkIcon}
                src={require('../../../assets/landing/Access_Desk_Space.svg')}
              />
              <CustomTypography
                variant='body2'
                fontWeight='bold'
                className={classes.MobileWorkMainTextPadding}>
                Access Desk Space
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Access Desk Space */}
          {/* Choose your Services */}
          <Grid item xs={12}>
            <Box textAlign='center' className={classes.mobileStep}>
              <img
                className={classes.MobileHowWorkIcon}
                src={require('../../../assets/landing/Choose_your_Services.svg')}
              />
              <CustomTypography
                variant='body2'
                fontWeight='bold'
                className={classes.MobileWorkMainTextPadding}>
                Choose your Services
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Choose your Services */}
          {/* Pay */}
          <Grid item xs={12}>
            <Box
              textAlign='center'
              className={[classes.mobileStep, classes.mobileSecondStep]}>
              <img
                className={classes.MobileHowWorkIcon}
                src={require('../../../assets/landing/Pay.svg')}
              />
              <CustomTypography
                variant='body2'
                fontWeight='bold'
                className={classes.MobileWorkMainTextPadding}>
                Pay
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Pay */}
          {/* Manage your Space */}
          <Grid item xs={12}>
            <Box
              textAlign='center'
              className={[classes.mobileStep, classes.mobileFirstStep]}>
              <img
                className={classes.MobileHowWorkIcon}
                src={require('../../../assets/landing/Manage_your_Space.svg')}
              />
              <CustomTypography
                variant='body2'
                fontWeight='bold'
                className={classes.MobileWorkMainTextPadding}>
                Manage your Space
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Manage your Space */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MobileHowWeWorkSection;
