import React, { useState } from 'react';
import { Grid, Box } from '@material-ui/core';
import useStyles from '../styles/RatingStyles';
import { FaStar } from 'react-icons/fa';

const Rating = () => {
  const classes = useStyles();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
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
                  color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                  size={30}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)} />
              </Box>
            </label>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Rating;