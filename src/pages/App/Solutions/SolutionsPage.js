import { Box, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
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

  return (
    <Grid container justify='center'>
      <FrontBanner
        imageSource={require('../../../assets/solution_page_desktop_2.png')}
        title={t('solutions')}
      />
      <Grid item xs={10} md={10}>
        <Box textAlign={'center'} className={classes.solutionDescContainer}>
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
  );
};

export default SolutionsPage;
