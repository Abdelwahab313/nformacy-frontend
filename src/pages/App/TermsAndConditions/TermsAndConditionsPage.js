import {Card, CardMedia, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import useStyles from './styles/TermsAndConditionsPageStyles';
import { useTranslation } from 'react-i18next';

const TermsAndConditionsPage = () => {
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
          title=''
        />
        <CustomTypography
          variant='h3'
          fontWeight={'bold'}
          className={classes.headerCardTxt}>
            {t('termsAndConditions')}
        </CustomTypography>
      </Card>
    </Grid>
  );
};

export default TermsAndConditionsPage;
