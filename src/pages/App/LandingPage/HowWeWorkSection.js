import { Box, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import classNames from 'clsx';
import { useTranslation } from 'react-i18next';
import useStyles from './styles/LandingPageStyles';

const HowWeWorkSection = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';

  return (
    <Grid
      container
      direction='row'
      justify='center'
      className={[
        classes.landingSectionsContainerPadding,
        classes.desktopVisible,
      ]}>
      <Grid item xs={10} md={12}>
        <Box textAlign='center'>
          <CustomTypography variant='h4' fontWeight='bold'>
            {t('howWeWork')}
          </CustomTypography>
          <CustomTypography variant='h5' className={classes.subTextMargin}>
            {t('howWeWorkDesc')}
          </CustomTypography>
        </Box>
      </Grid> 
      <Grid item xs={12}className={classNames(classes.stepsContainerMargin, {
            [classes.stepsContainerMarginAr]: isArlang,
          })}>
        <Grid container direction='row' justify='space-between'>
          {/* sign_up */}
          <Grid item md={2}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Sign_up.svg')}
              />
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                {t('signUp')}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={[
                  classes.workSubTextPadding,
                  classes.desktopVisible,
                ]}>
                {t('signUpDesc')}
              </CustomTypography>
            </Box>
          </Grid>
          {/* end sign_up */}
          {/* Access Desk Space */}
          <Grid item md={2}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Access_Desk_Space.svg')}
              />
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                {t('accessDeskSpace')}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={[
                  classes.workSubTextPadding,
                  classes.desktopVisible,
                ]}>
                {t('accessDeskSpaceDesc')}
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Access Desk Space */}
          {/* Choose your Services */}
          <Grid item md={2}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Choose_your_Services.svg')}
              />
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                {t('chooseYourServices')}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={[
                  classes.workSubTextPadding,
                  classes.desktopVisible,
                ]}>
                {t('chooseYourServicesDesc')}
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Choose your Services */}
          {/* Pay */}
          <Grid item md={2}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Pay.svg')}
              />
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                {t('pay')}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={[
                  classes.workSubTextPadding,
                  classes.desktopVisible,
                ]}>
                {t('payDesc')}
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Pay */}
          {/* Manage your Space */}
          <Grid item md={2}>
            <Box textAlign='center'>
              <img
                className={classes.howWorkIcon}
                src={require('../../../assets/landing/Manage_your_Space.svg')}
              />
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.workMainTextPadding}>
                {t('manageYourSpace')}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={[
                  classes.workSubTextPadding,
                  classes.desktopVisible,
                ]}>
                {t('manageYourSpaceDesc')}
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Manage your Space */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HowWeWorkSection;
