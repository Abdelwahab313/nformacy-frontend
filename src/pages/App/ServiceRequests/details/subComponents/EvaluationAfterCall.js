import React from 'react';
import { Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import Rating from './Rating';
import { useTranslation } from 'react-i18next';

const EvaluationAfterCall = () => {
  const { t } = useTranslation();

  return (
    <Grid container justify='center'>
      <Grid item md={4}>
        <CustomTypography variant="body1">1. I received the answers I was looking for:</CustomTypography>
      </Grid>
      <Rating ratingDescription={t('oneStar')}/>  
      <Rating ratingDescription={t('twoStars')}/>  
      <Rating ratingDescription={t('threeStars')}/>  
      <Rating ratingDescription={t('fourStars')}/>  
      <Rating ratingDescription={t('fiveStars')}/>  
    </Grid>
  );
};

export default EvaluationAfterCall;