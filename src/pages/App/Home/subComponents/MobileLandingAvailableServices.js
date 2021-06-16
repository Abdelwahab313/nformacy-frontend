import { Box, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from '../../LandingPage/styles/LandingPageStyles';
import LinkText from 'components/typography/LinkText';
import { RoutesPaths } from 'constants/routesPath';

const MobileLandingAvailableServices = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const getEditServiceDetailsLink = (assignmentType) => {
    return {
      pathname: RoutesPaths.App.EditServiceRequest,
      state: {
        service: {
          assignmentType,
        },
      },
    };
  };
  return (
    <Grid
      container
      direction='row'
      justify='center'
      className={[
        classes.mobileServicesPadding,
        classes.mobileSolutionServicesVisible,
      ]}>
      <Grid item xs={12} className={classes.serviceStepsContainerMargin}>
        <Grid container direction='row' justify='center'>
          <Grid item xs={12}>
            <Box textAlign='center' className={classes.mobileStep}>
              <img
                className={classes.mobileServicesIcon}
                src={require('../../../../assets/ask_experts.svg')}
              />
              <LinkText to={getEditServiceDetailsLink('ask')}>
                <CustomTypography
                  color={'primary'}
                  variant='body2'
                  fontWeight='bold'
                  className={classes.MobileWorkMainTextPadding}>
                  {t('askServiceTitle')}
                </CustomTypography>
                <CustomTypography
                  variant='caption'
                  color={'primary'}
                  className={classes.MobileWorkMainTextPadding}>
                  {t('askServiceButton')}
                </CustomTypography>
              </LinkText>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box textAlign='center' className={classes.mobileStep}>
              <img
                className={classes.mobileServicesIcon}
                src={require('../../../../assets/client-call.svg')}
              />
              <LinkText to={getEditServiceDetailsLink('call')}>
                <CustomTypography
                  variant='body2'
                  color={'primary'}
                  fontWeight='bold'
                  className={classes.MobileWorkMainTextPadding}>
                  {t('callTheExpert')}
                </CustomTypography>
                <CustomTypography
                  variant='caption'
                  color={'primary'}
                  className={classes.MobileWorkMainTextPadding}>
                  {t('callServiceButton')}
                </CustomTypography>
              </LinkText>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box textAlign='center' className={classes.mobileStep}>
              <Fragment>
                <img
                  className={classes.mobileServicesIcon}
                  src={require('../../../../assets/consultant.png')}
                />
                <LinkText to={getEditServiceDetailsLink('question')}>
                  <CustomTypography
                    variant='body2'
                    color={'primary'}
                    fontWeight='bold'
                    className={classes.MobileWorkMainTextPadding}>
                    {t('assignExpertServiceTitle')}
                  </CustomTypography>
                  <CustomTypography
                    variant='caption'
                    color={'primary'}
                    className={classes.MobileWorkMainTextPadding}>
                    {t('assignExpertServiceButton')}
                  </CustomTypography>
                </LinkText>
              </Fragment>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box textAlign='center' className={classes.mobileStep}>
              <Fragment>
                <img
                  className={classes.mobileServicesIcon}
                  src={require('../../../../assets/client-project.svg')}
                />
                <LinkText to={getEditServiceDetailsLink('project')}>
                  <CustomTypography
                    variant='body2'
                    color={'primary'}
                    fontWeight='bold'
                    className={classes.MobileWorkMainTextPadding}>
                    {t('projectServiceTitle')}
                  </CustomTypography>
                  <CustomTypography
                    variant='caption'
                    color={'primary'}
                    className={classes.MobileWorkMainTextPadding}>
                    {t('projectServiceButton')}
                  </CustomTypography>
                </LinkText>
              </Fragment>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MobileLandingAvailableServices;
