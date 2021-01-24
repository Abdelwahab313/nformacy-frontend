import { Box, Card, CardMedia, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ConsultantsJoinReasons from '../Home/subComponents/ConsultantsJoinReasons';
import ServeYouBtnSection from '../LandingPage/ServeYouBtnSection';
import useStyles from './styles/ConsultantsPageStyles';

const ConsultantsPage = () => {
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
          {t('consultants')}
        </CustomTypography>
      </Card>
      <Grid
        container
        direction='row'
        justify='center'
        className={[
          classes.landingSectionsContainerPadding,
          classes.lighterGrayContainer,
        ]}>
        <Grid item xs={10} md={12}>
          <Box textAlign='center'>
            <CustomTypography variant='h4' fontWeight='bold'>
              {t('joinNformacy')}
            </CustomTypography>
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.subTextMargin}>
          <ConsultantsJoinReasons />
        </Grid>
      </Grid>
      <ServeYouBtnSection />
    </Grid>
  );
};

export default ConsultantsPage;
