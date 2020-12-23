import React from 'react';
import { Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import Rating from './Rating';
import { useTranslation } from 'react-i18next';
import useStyles from '../styles/RatingStyles';


const EvaluationAfterCall = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} alignItems={'center'} justifyContent={'center'}>
        <Grid container>

          <Grid item xs={4}></Grid>

          <Grid item xs={8}>
            <Grid container justify="space-evenly">
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography>{t('oneStar')}</CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography>{t('twoStars')}</CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography>{t('threeStars')}</CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography>{t('fourStars')}</CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography>{t('fiveStars')}</CustomTypography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container justify='center'>
          <Grid item md={4} className={classes.evaluationQuestion}>
            <CustomTypography fontWeight="bold" variant="body1">1. I received the answers I was looking for:</CustomTypography>
          </Grid>

          <Grid item md={8}>
            <Rating ratingDescription={t('oneStar')} />
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  );
};

export default EvaluationAfterCall;