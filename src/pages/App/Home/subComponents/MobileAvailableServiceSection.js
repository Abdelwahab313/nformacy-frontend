import { Box, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from '../../LandingPage/styles/LandingPageStyles';
import LinkText from 'components/typography/LinkText';
import { RoutesPaths } from 'constants/routesPath';

const MobileAvailableServiceSection = () => {
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
        classes.mobileHowWorkVisible,
      ]}>
      <Grid item xs={7} className={classes.serviceStepsContainerMargin}>
        <Grid container direction='row' justify='center'>
          <Grid item xs={12}>
            <Box
              textAlign='center'
              className={[classes.mobileStep, classes.mobileFirstStep]}>
              <img
                className={classes.MobileHowWorkIcon}
                src={require('../../../../assets/client-call.svg')}
              />
              <LinkText to={getEditServiceDetailsLink('call')}>
                <CustomTypography
                  variant='body2'
                  fontWeight='bold'
                  className={[classes.MobileWorkMainTextPadding, classes.dashboardServicesMobile]}>
                  {t('callTheExpert')}
                </CustomTypography>
              </LinkText>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box textAlign='center' className={classes.mobileStep}>
              <Fragment>
                <img
                  className={classes.MobileHowWorkIcon}
                  src={require('../../../../assets/consultant.png')}
                />
                <CustomTypography
                  variant='body2'
                  fontWeight='bold'
                  className={classes.MobileWorkMainTextPadding}>
                  {t('assignExpertServiceTitle')}
                </CustomTypography>
              </Fragment>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              textAlign='center'
              className={[classes.mobileStep, classes.mobileFirstStep]}>
              <Fragment>
                <img
                  className={classes.MobileHowWorkIcon}
                  src={require('../../../../assets/client-project.svg')}
                />
                <CustomTypography
                  variant='body2'
                  fontWeight='bold'
                  className={classes.MobileWorkMainTextPadding}>
                  {t('projectServiceTitle')}
                </CustomTypography>
              </Fragment>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MobileAvailableServiceSection;
