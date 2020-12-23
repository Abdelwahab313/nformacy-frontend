import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import starRate from '../../../../../assets/star.png';
import filledStarRate from '../../../../../assets/filledStar.png';
import useStyles from '../styles/RatingStyles';
import CustomTypography from 'components/typography/Typography';

const Rating = ({ratingDescription}) => {
  const classes = useStyles();
  const [selectedImg, setSelectedImg] = useState(false);

  return (
    <Grid item xs={1} md={1}>
      <div className={classes.circleRate}>
        <img src={selectedImg ? filledStarRate : starRate} alt="React Logo"
          width={30} height={30}
          onClick={() => setSelectedImg(!selectedImg)} />
      </div>
      <CustomTypography variant='body2' alignContent={'center'} className={classes.rateDescription}>{ratingDescription}</CustomTypography>
    </Grid>
  );
};

export default Rating;