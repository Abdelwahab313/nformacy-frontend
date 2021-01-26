import { Box, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import useStyles from './styles/LandingPageStyles';

const ConsultantsPageStatistics = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='flex-end'
      className={classes.serveYouPadding}>
      <Grid item xs={6} md={3}>
        <Box textAlign='center'>
          <CustomTypography
            variant='h1'
            fontWeight='bold'
            className={classes.mediumTurquoiseTxt}>
            +200
          </CustomTypography>
          <CustomTypography variant='h4' fontWeight='bold'>
            Consultants
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={6} md={3}>
        <Box textAlign='center'>
          <CustomTypography
            variant='h1'
            fontWeight='bold'
            className={classes.mediumTurquoiseTxt}>
            +30
          </CustomTypography>
          <CustomTypography variant='h4' fontWeight='bold'>
            Nationalities
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={6} md={3}>
        <Box textAlign='center'>
          <CustomTypography
            variant='h1'
            fontWeight='bold'
            className={classes.mediumTurquoiseTxt}>
            +19
          </CustomTypography>
          <CustomTypography variant='h4' fontWeight='bold'>
            Spoken Languages
          </CustomTypography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ConsultantsPageStatistics;
