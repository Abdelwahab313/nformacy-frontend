import React from 'react';
import { Box, Grid } from '@material-ui/core';
import classNames from 'clsx';
import LandingPageContainer from 'components/grid/LandingPageContainer';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import AreasOfSpeciality from '../LandingPage/AreasOfSpeciality';
import HowWeWorkSection from '../LandingPage/HowWeWorkSection';
import MobileHowWeWorkSection from '../LandingPage/MobileHowWeWorkSection';
import OurSolutionsPageServicesSection from '../LandingPage/OurSolutionsPageServicesSection';
import ServeYouBtnSection from '../LandingPage/ServeYouBtnSection';
import FrontBanner from '../LandingPage/subComponents/FrontBanner';
import useStyles from './styles/SolutionsPageStyles';

const SolutionsPage = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';

  return (
    <LandingPageContainer className={classes.landingContainer}>
      <Grid container justify='center'>
        <FrontBanner
          imageSource={require('../../../assets/landing/solutions_image.png')}
          imageClassName={classes.solutionsImageBanner}
          title={t('solutions')}
          description={t('solutionsDesc')}
          buttonText={t('letusServeYou')}
        />
        <Grid item xs={10} md={10}>
          <Box textAlign={'center'}className={classNames(classes.solutionDescContainer, {
                      [classes.solutionDescContainerAr]: isArlang,
                    })}>
            <CustomTypography variant='h5'>
              {t('solutionsPageDesc')}
            </CustomTypography>
          </Box>
        </Grid>
        <OurSolutionsPageServicesSection />
        <HowWeWorkSection />
        <MobileHowWeWorkSection />
        <AreasOfSpeciality />
        <ServeYouBtnSection />
      </Grid>
    </LandingPageContainer>
  );
};

export default SolutionsPage;
