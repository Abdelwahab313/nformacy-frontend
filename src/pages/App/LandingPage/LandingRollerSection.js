import { Box, Grid, Slide } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import SubmitButton from 'components/buttons/SubmitButton';
import CustomTypography from 'components/typography/Typography';
import { RoutesPaths } from 'constants/routesPath';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import useStyles from './styles/LandingPageStyles';

const LandingRollerSection = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const [sliderItem, setSliderItem] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderItem((prevState) => !prevState);
    }, 700000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='flex-end'
      className={classes.landingSectionsContainerPadding}>
      <Grid item xs={10} md={6} className={classes.rollerSection}>
        <Slide direction={'right'} in={sliderItem} timeout={500}>
          <Box>
            {sliderItem && (
              <div>
                <CustomTypography variant='h4' fontWeight='bold'>
                  {t('landingAdvisoryServices')}
                </CustomTypography>
                <CustomTypography
                  variant='h5'
                  className={classes.subTextMargin}>
                  {t('landingAdvisoryServicesDesc')}
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
                  {t('landingConsultingLimit')}
                </CustomTypography>
                <CustomTypography
                  variant='h5'
                  className={classes.subTextMargin}>
                  {t('landingConsultingLimitDesc')}
                </CustomTypography>
              </div>
            )}
          </Box>
        </Slide>
      </Grid>
      <Grid item xs={12} md={6} className={classes.imgSection}>
        <img
          className={classes.firstSectionImg}
          src={require('../../../assets/landing/nformacy_Illustrations@1x.png')}
        />
      </Grid>
      <Grid item xs={10} md={3} className={classes.ctaSection}>
        <Box textAlign='center'>
          <SubmitButton
            id={'serveBtn'}
            onClick={() => history.push(RoutesPaths.App.Signup)}
            className={classes.mainCtaBtn}
            buttonText={
              <CustomTypography variant='body1' className={classes.flexClass}>
                {t('letusServeYou')} <ArrowForward />
              </CustomTypography>
            }
          />
        </Box>
      </Grid>
      <Grid item xs={10} md={12} className={classes.platformBrief}>
        <CustomTypography
          variant='h4'
          fontWeight='bold'
          className={classes.subTextMargin}>
          {t('landingPlatformBrief')}
        </CustomTypography>
        <SubmitButton
          id={'briefBtn'}
          onClick={() => history.push(RoutesPaths.App.About)}
          className={[classes.mainCtaBtn, classes.whiteCtaBtn]}
          buttonText={
            <CustomTypography variant='body1' className={classes.flexClass}>
              {t('WhoNformacy')} <ArrowForward />
            </CustomTypography>
          }
        />
      </Grid>
    </Grid>
  );
};

export default LandingRollerSection;
