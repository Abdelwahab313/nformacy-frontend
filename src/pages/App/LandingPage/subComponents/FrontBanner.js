import React from 'react';
import { Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import useStyles from '../styles/LandingPageStyles';
import clsx from 'clsx';

const FrontBanner = ({
  imageSource,
  imageClassName = '',
  title,
  titleClassName = '',
}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction='row-reverse'
      justify='center'
      alignItems='center'
      className={classes.firstSectionContainerPadding}>
      <Grid item xs={12} md={7} className={classes.justifyChildren}>
        <img
          className={clsx(classes.bannerImage, imageClassName)}
          src={imageSource}
        />
      </Grid>
      <Grid item xs={12} md={5} className={classes.justifyChildren}>
        <CustomTypography
          variant='h3'
          fontWeight={'bold'}
          className={clsx(classes.bannerTitle, titleClassName)}>
          {title}
        </CustomTypography>
      </Grid>
    </Grid>
  );
};

export default FrontBanner;
