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
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Sign_up.svg')}
              />
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                {t('futureLooking')}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={[classes.workSubTextPadding]}>
                {t('futureLookingDesc')}
              </CustomTypography>
            </Box>
          </Grid>
          {/* end future */}
          {/* Simplicity */}
          <Grid item md={3} className={classes.ourValueItem}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Sign_up.svg')}
              />
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                {t('simplicity')}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={[classes.workSubTextPadding]}>
                {t('simplicityDesc')}
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Simplicity */}
          {/* integrity */}
          <Grid item md={3} className={classes.ourValueItem}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Sign_up.svg')}
              />
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                {t('integrity')}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={[classes.workSubTextPadding]}>
                {t('integrityDesc')}
              </CustomTypography>
            </Box>
          </Grid>
          {/* end integrity */}
          {/* reliability */}
          <Grid item md={3} className={classes.ourValueItem}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Sign_up.svg')}
              />
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                {t('reliability')}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={[classes.workSubTextPadding]}>
                {t('reliabilityDesc')}
              </CustomTypography>
            </Box>
          </Grid>
          {/* end reliability */}
          {/* quality */}
          <Grid item md={3} className={classes.ourValueItem}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Sign_up.svg')}
              />
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                {t('quality')}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={[classes.workSubTextPadding]}>
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
