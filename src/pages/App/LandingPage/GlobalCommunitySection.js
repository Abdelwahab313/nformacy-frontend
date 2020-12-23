import { Box, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import useStyles from './styles/LandingPageStyles';
import { greyDividerStyle } from 'styles/formsStyles';
import LinkText from 'components/typography/LinkText';
import SubmitButton from 'components/buttons/SubmitButton';
import { RoutesPaths } from 'constants/routesPath';
import { ArrowForward } from '@material-ui/icons';

const GlobalCommunitySection = () => {
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
            Our Global Community of Subject Matter Experts
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item md={4} className={classes.subTextMargin}></Grid>
      <Grid item md={4} className={classes.subTextMargin}>
        <Box textAlign={'center'}>
          <CustomTypography variant='h5' className={classes.subTextMargin}>
            nformacy brings consultancy closer to Experts and Clients
          </CustomTypography>
          <LinkText
            to={RoutesPaths.App.Signup}
            className={classes.primaryBoldTxt}>
            Why to join us
          </LinkText>
          <Divider variant='middle' style={greyDividerStyle} />
          <CustomTypography variant='h5' className={classes.subTextMargin}>
            Join Our Community and Be Part of the Most Dynamic and Reliable
            Network of Independent Experts
          </CustomTypography>
          <SubmitButton
            id={'briefBtn'}
            onClick={() => {}}
            className={[classes.mainCtaBtn, classes.orangeCtaBtn]}
            buttonText={
              <CustomTypography variant='body1' className={classes.flexClass}>
                Register <ArrowForward />
              </CustomTypography>
            }
          />
        </Box>
      </Grid>
      <Grid item md={4} className={classes.subTextMargin}></Grid>
    </Grid>
  );
};

export default GlobalCommunitySection;
