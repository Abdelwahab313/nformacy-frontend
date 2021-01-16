import { Box, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import useStyles from './styles/LandingPageStyles';
import { greyDividerStyle } from 'styles/formsStyles';
import LinkText from 'components/typography/LinkText';
import SubmitButton from 'components/buttons/SubmitButton';
import { RoutesPaths } from 'constants/routesPath';
import { ArrowForward } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

const GlobalCommunitySection = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <Grid
      container
      direction='row'
      justify='center'
      className={classes.landingSectionsContainerPadding}>
      <Grid item xs={12} className={classes.headerCommunitySectionOrder}>
        <Box textAlign='center'>
          <CustomTypography variant='h4' fontWeight='bold'>
            {t('ourGlobalCommunityOfSubjectMatterExperts')}
          </CustomTypography>
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        md={4}
        className={[
          classes.subTextMargin,
          classes.leftMapCommunitySectionOrder,
        ]}>
        <Box className={classes.subTextMargin}>
          <img
            className={classes.firstSectionImg}
            src={require('../../../assets/landing/left_map.svg')}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={10}
        md={4}
        className={[
          classes.subTextMargin,
          classes.betweenMapCommunitySectionOrder,
        ]}>
        <Box textAlign={'center'}>
          <CustomTypography variant='h5' className={classes.subTextMargin}>
            {t('nformacyBringsConsultancyCloser')}
          </CustomTypography>
          <LinkText
            to={RoutesPaths.App.Signup}
            className={classes.primaryBoldTxt}>
            {t('whyToJoinUs')}
          </LinkText>
          <Divider
            variant='middle'
            style={greyDividerStyle}
            className={classes.golbalSectionDivider}
          />
          <CustomTypography variant='h5' className={classes.subTextMargin}>
           {t('joinOurCommunityAndBePart')}
          </CustomTypography>
          <SubmitButton
            id={'registerBtn'}
            onClick={() => history.push(RoutesPaths.App.Signup)}
            className={[classes.mainCtaBtn, classes.orangeCtaBtn]}
            buttonText={
              <CustomTypography variant='body1' className={classes.flexClass}>
                {t('register')} <ArrowForward />
              </CustomTypography>
            }
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        md={4}
        className={[
          classes.subTextMargin,
          classes.rightMapCommunitySectionOrder,
        ]}>
        <Box className={classes.subTextMargin}>
          <img
            className={classes.firstSectionImg}
            src={require('../../../assets/landing/right_map.svg')}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default GlobalCommunitySection;
