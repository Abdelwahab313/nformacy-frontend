import React from 'react';
import { Grid, Box } from '@material-ui/core';
import useStyles from './styles/RatingStyles';
import { FaStar } from 'react-icons/fa';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import { useCallEvaluationContext } from './context';
import { updateEvaluationForm } from './context/callEvaluationAction';

const Rating = ({ evaluationKey }) => {
  const classes = useStyles();
  const isRecommendedService = evaluationKey === 'serviceRecomendation';
  const { t } = useTranslation();
  const [{ ratingEvaluations }, dispatch] = useCallEvaluationContext();

  const rating = ratingEvaluations[evaluationKey];
  const setRating = (ratingValue) => {
    updateEvaluationForm(dispatch, { ...ratingEvaluations, [evaluationKey]: ratingValue });
  };

  return (
    <Grid container justify='center' className={classes.callEvaluationStarsContainer}>
      <Grid item md={4} sm={6} className={classes.evaluationQuestion}>
        <CustomTypography fontWeight="bold" variant="body1">{t(evaluationKey)}</CustomTypography>
      </Grid>

      <Grid item md={8} sm={6}>
        <Grid container justify="space-evenly" className={classes.starRatingContainer}>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            const ratingStarsValue = () => {
              if (ratingValue === 1) {
                return 'I Will Not';
              } else if (ratingValue === 5) {
                return 'Definitely I Will';
              }
              return null;
            };
            return (
              <Grid item xs className={evaluationKey === 'serviceRecomendation' ? classes.centerText : classes.starsContainer}>
                <label align={'center'}>
                  <input type="radio"
                    name="rating"
                    value={ratingValue}
                    className={classes.ratingRadioCheck}
                    onClick={() => setRating(ratingValue)} />

                  <Box className={classes.circleRate}>
                    <FaStar className={classes.star}
                      color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                      size={30} />
                  </Box>
                  {!!isRecommendedService && (
                    <CustomTypography align={'center'} className={classes.recommendationStyle}>{ratingStarsValue()}</CustomTypography>
                  )}
                </label>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Rating;