import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import useStyles from './styles/RatingStyles';
import CustomTypography from 'components/typography/Typography';
import Rating from './Rating';

const ViewEvaluations = ({ ratingEvaluations, setRatingEvaluations }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Fragment>
      <Grid item xs={12} alignItems={'center'} justifyContent={'center'}>
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={8} className={classes.ratingDescriptionContainer}>
            <Grid container justify='space-evenly'>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography variant='body1' fontWeight='bold'>
                  {t('oneStar')}
                </CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography variant='body1' fontWeight='bold'>
                  {t('twoStars')}
                </CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography variant='body1' fontWeight='bold'>
                  {t('threeStars')}
                </CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography variant='body1' fontWeight='bold'>
                  {t('fourStars')}
                </CustomTypography>
              </Grid>
              <Grid item xs className={classes.ratingDescription}>
                <CustomTypography variant='body1' fontWeight='bold'>
                  {t('fiveStars')}
                </CustomTypography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {Object.keys(ratingEvaluations).map((evaluationKey) => {
          return (
            <Rating
              evaluationKey={evaluationKey}
              rating={ratingEvaluations[evaluationKey]}
              updateRatingValue={(value) => {
                !!setRatingEvaluations &&
                  setRatingEvaluations({
                    ...ratingEvaluations,
                    [evaluationKey]: value,
                  });
              }}
            />
          );
        })}
      </Grid>
    </Fragment>
  );
};

export default ViewEvaluations;
