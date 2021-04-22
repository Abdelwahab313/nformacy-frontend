import { Box, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from '../../LandingPage/styles/LandingPageStyles';
import LinkText from 'components/typography/LinkText';

const MobileAvailableServiceSection = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid
      container
      direction='row'
      justify='center'
      className={[
        classes.landingSectionsContainerPadding,
        classes.mobileHowWorkVisible,
      ]}>
      <Grid item xs={7} className={classes.stepsContainerMargin}>
        <Grid container direction='row' justify='center'>

          {/* sign_up */}
          <Grid item xs={12}>
            <Box
              textAlign='center'
              className={[classes.mobileStep, classes.mobileFirstStep]}>
              <img
                className={classes.MobileHowWorkIcon}
                src={require('../../../../assets/client-call.svg')}
              />
              <LinkText to={() => { }}>
                <CustomTypography
                  variant='body2'
                  fontWeight='bold'
                  className={classes.MobileWorkMainTextPadding}>
                  {t('callTheExpert')}
                </CustomTypography>
              </LinkText>
            </Box>
          </Grid>
          {/* end sign_up */}

          {/* Choose your Services */}
          <Grid item xs={12}>
            <Box textAlign='center' className={classes.mobileStep}>
              <img
                className={classes.MobileHowWorkIcon}
                src={require('../../../../assets/consultant.png')}
              />
              <LinkText to={() => { }}>
                <CustomTypography
                  variant='body2'
                  fontWeight='bold'
                  className={classes.MobileWorkMainTextPadding}>
                  {t('assignExpertServiceTitle')}
                </CustomTypography>
              </LinkText>
            </Box>
          </Grid>
          {/* end Choose your Services */}

          {/* Manage your Space */}
          <Grid item xs={12}>
            <Box
              textAlign='center'
              className={[classes.mobileStep, classes.mobileFirstStep]}>
              <img
                className={classes.MobileHowWorkIcon}
                src={require('../../../../assets/client-project.svg')}
              />
              <LinkText to={() => { }}>
                <CustomTypography
                  variant='body2'
                  fontWeight='bold'
                  className={classes.MobileWorkMainTextPadding}>
                  {t('projectServiceTitle')}
                </CustomTypography>
              </LinkText>
            </Box>
          </Grid>
          {/* end Manage your Space */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MobileAvailableServiceSection;
