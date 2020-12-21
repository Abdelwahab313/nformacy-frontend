import { Grid } from '@material-ui/core';
import SubmitButton from 'components/buttons/SubmitButton';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import useStyles from './styles/LandingPageStyles';

const LandingPage = () => {
  const classes = useStyles();
  return (
    <Grid container justify='center' className={classes.landingContainer}>
      {/* first dection */}
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item xs={12} md={6}>
          <CustomTypography variant='h3' fontWeight='bold'>
            Advisory Services at Your Fingertips{' '}
          </CustomTypography>
          <CustomTypography variant='h4'>
            Join the world’s top network of professional advisors and get
            instant solutions for your biggest challenges.
          </CustomTypography>
          <SubmitButton
            id={'proceedBtn'}
            onClick={{}}
            className={classes.mainCtaBtn}
            buttonText={
              <CustomTypography variant='body1'>
                Let us Serve You
              </CustomTypography>
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            className={classes.firstSectionImg}
            src={require('../../../assets/landing/nformacy_Illustrations@1x.png')}
          />
        </Grid>
      </Grid>
      {/* end first dection */}
    </Grid>
  );
};

export default LandingPage;
