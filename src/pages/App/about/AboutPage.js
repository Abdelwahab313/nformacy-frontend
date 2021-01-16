import { Box, Card, CardMedia, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AboutUsGalleryDescription from '../LandingPage/AboutUsGalleryDescription';
import OurPromiseSection from '../LandingPage/OurPromiseSection';
import OurValuesSection from '../LandingPage/OurValuesSection';
import ServeYouBtnSection from '../LandingPage/ServeYouBtnSection';
import useStyles from './styles/AboutPageStyles';

const AboutPage = () => {
  const classes = useStyles();
  const { t } = useTranslation();

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
          {t('about')}
        </CustomTypography>
      </Card>
      <Grid item xs={10} md={10}>
        <Box textAlign={'center'} marginY={10}>
          <CustomTypography variant='h4' fontWeight='bold' gutterBottom>
            {t('aboutDescriptionTitle')}
          </CustomTypography>
          <CustomTypography variant='h5'>
            {t('aboutDescription')}
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={12} className={classes.orangeBg}>
        <Box width={'80%'} textAlign={'center'} marginY={10} marginX={'auto'}>
          <CustomTypography variant='h4' fontWeight='bold'>
            {t('aboutOurPassion')}
          </CustomTypography>
        </Box>
      </Grid>
      <OurValuesSection />
      <AboutUsGalleryDescription />
      <OurPromiseSection />
      <ServeYouBtnSection />
    </Grid>
  );
};

export default AboutPage;
