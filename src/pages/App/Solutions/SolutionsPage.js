import { Box, Grid } from '@material-ui/core';
import PageContainer from 'components/grid/PageContainer';
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
    <PageContainer>
      <Grid container justify='center'>
        <FrontBanner
          imageSource={require('../../../assets/landing/solutions_image.png')}
          imageClassName={classes.solutionsImageBanner}
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
    </PageContainer>
  );
};

export default SolutionsPage;
