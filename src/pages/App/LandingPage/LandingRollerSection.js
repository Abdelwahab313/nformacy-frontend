import { Box, Grid, Slide } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import classNames from 'clsx';
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
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';
  const [sliderItem, setSliderItem] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderItem((prevState) => !prevState);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      className={classes.firstSectionContainerPadding}>
      <Grid item xs={10} md={4} className={classes.rollerSection}>
        <Box className={classes.sliderTextContainer}>
          <Slide direction={'right'} in={sliderItem} timeout={500}>
            <Box>
              {sliderItem && (
                <div>
                  <CustomTypography
                    className={classNames(classes.sliderItemText, {
                      [classes.sliderItemTextAr]: isArlang,
                    })}
                    variant='h4'
                    fontWeight='bold'>
                    {t('landingAdvisoryServices')}
                  </CustomTypography>
                  <CustomTypography
                    variant='h5'               
                    className={classNames(classes.subTextMargin, {
                      [classes.subTextMarginAr]: isArlang,
                    })}>
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
                  <CustomTypography  className={classNames(classes.sliderItemText, {
                      [classes.sliderItemTextAr]: isArlang,
                    })} variant='h4' fontWeight='bold'>
                    {t('landingConsultingLimit')}
                  </CustomTypography>
                  <CustomTypography
                    variant='h5'
                    className={classNames(classes.subTextMargin, {
                      [classes.subTextMarginAr]: isArlang,
                    })}>
                    {t('landingConsultingLimitDesc')}
                  </CustomTypography>
                </div>
              )}
            </Box>
          </Slide>
        </Box>
        <Box className={classes.submitBtnContainer} textAlign='right'>
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
      <Grid item xs={12} md={6} className={classes.imgSection}>
        <img
          className={classes.firstSectionImg}
          src={require('../../../assets/landing/nformacy_landing.jpg')}
        />
      </Grid>
      <Grid item xs={10} md={12} className={classes.platformBrief}>
        <CustomTypography
          variant='h4'
          fontWeight='bold'
          className={classNames(classes.subTextMargin, {
            [classes.subTextMarginAr]: isArlang,
          })}>
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
