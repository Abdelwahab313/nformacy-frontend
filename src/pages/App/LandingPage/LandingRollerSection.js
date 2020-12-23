import { Box, Grid, Slide } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import SubmitButton from 'components/buttons/SubmitButton';
import CustomTypography from 'components/typography/Typography';
import React, { useEffect, useState } from 'react';
import useStyles from './styles/LandingPageStyles';

const LandingRollerSection = () => {
  const classes = useStyles();
  const [sliderItem, setSliderItem] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderItem((prevState) => !prevState);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='flex-end'
      className={classes.landingSectionsContainerPadding}>
      <Grid item xs={12} md={6}>
        <Slide direction={'right'} in={sliderItem} timeout={500}>
          <Box>
            {sliderItem && (
              <div>
                <CustomTypography variant='h4' fontWeight='bold'>
                  Advisory Services at Your Fingertips
                </CustomTypography>
                <CustomTypography
                  variant='h5'
                  className={classes.subTextMargin}>
                  Join the world’s top network of professional advisors and get
                  instant solutions for your biggest challenges.
                </CustomTypography>
              </div>
            )}
          </Box>
        </Slide>
        <Slide direction={'right'} in={!sliderItem} timeout={500}>
          <Box>
            {!sliderItem && (
              <div>
                <CustomTypography variant='h4' fontWeight='bold'>
                  Consulting is not limited to big projects!
                </CustomTypography>
                <CustomTypography
                  variant='h5'
                  className={classes.subTextMargin}>
                  Get professional top advisory services from our high-end
                  network of consultants for your burning issues, start with
                  asking a question.
                </CustomTypography>
              </div>
            )}
          </Box>
        </Slide>
      </Grid>
      <Grid item xs={12} md={6}>
        <img
          className={classes.firstSectionImg}
          src={require('../../../assets/landing/nformacy_Illustrations@1x.png')}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Box textAlign='center'>
          <SubmitButton
            id={'serveBtn'}
            onClick={() => {}}
            className={classes.mainCtaBtn}
            buttonText={
              <CustomTypography variant='body1' className={classes.flexClass}>
                Let us Serve You <ArrowForward />
              </CustomTypography>
            }
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={11} className={classes.platformBrief}>
        <CustomTypography
          variant='h4'
          fontWeight='bold'
          className={classes.subTextMargin}>
          nformacy information exchange platform is your second office where you
          can instantly access a pool of top business experts from allover the
          world, build your personalized work-space and track your advisory
          assignments and activities and get your professional needs met.
        </CustomTypography>
        <SubmitButton
          id={'briefBtn'}
          onClick={() => {}}
          className={[classes.mainCtaBtn, classes.whiteCtaBtn]}
          buttonText={
            <CustomTypography variant='body1' className={classes.flexClass}>
              Who’s nformacy <ArrowForward />
            </CustomTypography>
          }
        />
      </Grid>
    </Grid>
  );
};

export default LandingRollerSection;
