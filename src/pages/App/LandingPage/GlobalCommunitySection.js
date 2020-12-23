import { Box, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import useStyles from './styles/LandingPageStyles';
import { greyDividerStyle } from 'styles/formsStyles';

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
        <Box>
          <CustomTypography variant='h5' className={classes.subTextMargin}>
            nformacy community of top talented and passionate exerts from
            all-over the world
            <br />
            Join Our Community and Be Part of the Most Dynamic and Reliable
            Network of Independent Experts.
          </CustomTypography>
          <Divider variant='middle' style={greyDividerStyle} />
        </Box>
      </Grid>
      <Grid item md={4} className={classes.subTextMargin}></Grid>
    </Grid>
  );
};

export default GlobalCommunitySection;
