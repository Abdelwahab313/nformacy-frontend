import React from 'react';
import { Grid, Box } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import useStyles from '../styles/LandingPageStyles';
import clsx from 'clsx';
import SubmitButton from 'components/buttons/SubmitButton';
import { RoutesPaths } from 'constants/routesPath';
import { history } from 'services/navigation';
import { ArrowForward } from '@material-ui/icons';

const FrontBanner = ({
  imageSource,
  imageClassName = '',
  title = '',
  description = '',
  buttonText = '',
}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction='row-reverse'
      justify='center'
      alignItems='center'
      className={classes.firstSectionContainerPadding}>
      <Grid item xs={12} md={7} className={classes.justifyChildren}>
        <img
          className={clsx(classes.bannerImage, imageClassName)}
          src={imageSource}
        />
      </Grid>
      <Grid item xs={12} md={5} className={classes.justifyChildren}>
        <Box
          className={clsx(classes.rollerSection, classes.bannerSectionSpacing)}>
          <Box className={classes.sliderTextContainer}>
            <Box>
              <div>
                <CustomTypography variant='h4' fontWeight='bold'>
                  {title}
                </CustomTypography>
                <CustomTypography
                  variant='h5'
                  className={classes.subTextMargin}>
                  {description}
                </CustomTypography>
              </div>
            </Box>
          </Box>
          <Box className={classes.submitBtnContainer} textAlign='right'>
            {!!buttonText && (
              <SubmitButton
                id={'serveBtn'}
                onClick={() => history.push(RoutesPaths.App.Signup)}
                className={classes.mainCtaBtn}
                buttonText={
                  <CustomTypography
                    variant='body1'
                    className={classes.flexClass}>
                    {buttonText} <ArrowForward />
                  </CustomTypography>
                }
              />
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FrontBanner;
