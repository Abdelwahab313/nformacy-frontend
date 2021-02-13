import { Box, Card, CardMedia, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AreasOfSpeciality from '../LandingPage/AreasOfSpeciality';
import HowWeWorkSection from '../LandingPage/HowWeWorkSection';
import MobileHowWeWorkSection from '../LandingPage/MobileHowWeWorkSection';
import OurSolutionsPageServicesSection from '../LandingPage/OurSolutionsPageServicesSection';
import ServeYouBtnSection from '../LandingPage/ServeYouBtnSection';
import useStyles from './styles/SolutionsPageStyles';

const SolutionsPage = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container justify='center'>
      <Card className={classes.headerCard}>
        <CardMedia
          component='img'
          alt='Header'
          className={classes.headerCardImg}
          image={require('../../../assets/solution_page_desktop_2.png')}
          title='Header'
        />
        <CustomTypography
          variant='h3'
          fontWeight={'bold'}
          className={classes.headerCardTxt}>
          {t('solutions')}
        </CustomTypography>
      </Card>
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
