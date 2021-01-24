import { Box, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './styles/LandingPageStyles';

const OurValuesSection = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid
      container
      direction='row'
      justify='center'
      className={[
        classes.landingSectionsContainerPadding,
        classes.lighterGrayContainer,
      ]}>
      <Grid item xs={10} md={12}>
        <Box textAlign='center'>
          <CustomTypography variant='h4' fontWeight='bold'>
            {t('ourValues')}
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={12} className={classes.stepsContainerMargin}>
        <Grid container direction='row' justify='center'>
          {/* future */}
          <Grid item md={3} className={classes.ourValueItem}>
            <Box textAlign='center'>
              <Box
                className={[
                  classes.ourValuesIconContainer,
                  classes.lightOrangeBG,
                ]}>
                <img
                  src={require('../../../assets/about/Future_Looking.svg')}
                />
              </Box>
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                {t('futureLooking')}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                >
                {t('futureLookingDesc')}
              </CustomTypography>
            </Box>
          </Grid>
          {/* end future */}
          {/* Simplicity */}
          <Grid item md={3} className={classes.ourValueItem}>
            <Box textAlign='center'>
              <Box
                className={[
                  classes.ourValuesIconContainer,
                  classes.darkBlueBG,
                ]}>
                <img src={require('../../../assets/about/Simplicity.svg')} />
              </Box>
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                {t('simplicity')}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                >
                {t('simplicityDesc')}
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Simplicity */}
          {/* integrity */}
          <Grid item md={3} className={classes.ourValueItem}>
            <Box textAlign='center'>
              <Box
                className={[
                  classes.ourValuesIconContainer,
                  classes.mediumTurquoiseBG,
                ]}>
                <img src={require('../../../assets/about/Integrity.svg')} />
              </Box>
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                {t('integrity')}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                >
                {t('integrityDesc')}
              </CustomTypography>
            </Box>
          </Grid>
          {/* end integrity */}
          {/* reliability */}
          <Grid item md={3} className={classes.ourValueItem}>
            <Box textAlign='center'>
              <Box
                className={[
                  classes.ourValuesIconContainer,
                  classes.darkOrangeBG,
                ]}>
                <img src={require('../../../assets/about/Reliability.svg')} />
              </Box>
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                {t('reliability')}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                >
                {t('reliabilityDesc')}
              </CustomTypography>
            </Box>
          </Grid>
          {/* end reliability */}
          {/* quality */}
          <Grid item md={3} className={classes.ourValueItem}>
            <Box textAlign='center'>
              <Box
                className={[
                  classes.ourValuesIconContainer,
                  classes.lightOrangeBG,
                ]}>
                <img src={require('../../../assets/about/Quality.svg')} />
              </Box>
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                {t('quality')}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                >
                {t('qualityDesc')}
              </CustomTypography>
            </Box>
          </Grid>
          {/* end quality */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OurValuesSection;
