import { Box, Card, CardMedia, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import AreasOfSpeciality from '../LandingPage/AreasOfSpeciality';
import HowWeWorkSection from '../LandingPage/HowWeWorkSection';
import MobileHowWeWorkSection from '../LandingPage/MobileHowWeWorkSection';
import OurSolutionsPageServicesSection from '../LandingPage/OurSolutionsPageServicesSection';
import useStyles from './styles/SolutionsPageStyles';

const SolutionsPage = () => {
  const classes = useStyles();

  return (
    <Grid container justify='center'>
      <Card className={classes.headerCard}>
        <CardMedia
          component='img'
          alt='Header'
          className={classes.headerCardImg}
          image={require('../../../assets/BG1@1x.png')}
          title='Header'
        />
        <CustomTypography
          variant='h3'
          fontWeight={'bold'}
          className={classes.headerCardTxt}>
          Solutions
        </CustomTypography>
      </Card>
      <Grid item xs={10} md={10}>
        <Box textAlign={'center'} marginY={10}>
          <CustomTypography variant='h5'>
            When you have a burning issue at work which you need more guidance,
            and support in, now you can get professional, highly specialized
            consultancy on your issue by the top experts in the field without
            the need to have big case or submitting RFP’s. You can benefit from
            our network of experts to support your business needs though
            advisory calls which you schedule based on your time and
            availability. Get the top consultancy advise instead of trial and
            error, or asking unspecialized people, or googling the issue. Submit
            your issue or question in our platform and we will match you with
            the best fit expert who has actual know how and experience in the
            filed of your concern.
          </CustomTypography>
        </Box>
      </Grid>
      <OurSolutionsPageServicesSection />
      <HowWeWorkSection />
      <MobileHowWeWorkSection />
      <AreasOfSpeciality />
    </Grid>
  );
};

export default SolutionsPage;
