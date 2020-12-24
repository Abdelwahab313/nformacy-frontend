import React, { useState } from 'react';
import { Grid, Box } from '@material-ui/core';
import useStyles from '../styles/RatingStyles';
import { FaStar } from 'react-icons/fa';
import CustomTypography from 'components/typography/Typography';

const Rating = ({ evaluationQuestion }) => {
  const classes = useStyles();
  const [rating, setRating] = useState(null);

  return (
    <Grid container justify='center'>
      <Grid item md={4} className={classes.evaluationQuestion}>
        <CustomTypography fontWeight="bold" variant="body1">{evaluationQuestion}</CustomTypography>
      </Grid>

      <Grid item md={8}>
        <Grid container justify="space-evenly" className={classes.starRatingContainer}>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <Grid item xs className={classes.starsContainer}>
                <label>
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