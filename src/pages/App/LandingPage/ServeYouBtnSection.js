import { Box, Grid } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import SubmitButton from 'components/buttons/SubmitButton';
import CustomTypography from 'components/typography/Typography';
import { RoutesPaths } from 'constants/routesPath';
import React from 'react';
import { useHistory } from 'react-router';
import useStyles from './styles/LandingPageStyles';

const ServeYouBtnSection = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='flex-end'
      className={classes.serveYouPadding}>
      <Grid item xs={10} md={3} className={classes.ctaSection}>
        <Box textAlign='center'>
          <SubmitButton
            id={'serveBtn'}
            onClick={() => history.push(RoutesPaths.App.Signup)}
            className={classes.mainCtaBtn}
            buttonText={
              <CustomTypography variant='body1' className={classes.flexClass}>
                Let us Serve You <ArrowForward />
              </CustomTypography>
            }
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ServeYouBtnSection;
