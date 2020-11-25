import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import LinkText from 'components/typography/LinkText';
import CustomTypography from 'components/typography/Typography';
import NextArrow from 'components/icons/NextArrow';

const HomePageCard = ({ title, viewMoreUrl, viewMoreText, children }) => {
  const classes = useStyles();

  return (
    <Grid>
      <Grid
        container
        direction={'row'}
        justify='space-between'
        className={classes.marginBottom}>
        <Grid item>
          <CustomTypography variant='h5' fontWeight='bold'>
            {title}
          </CustomTypography>
        </Grid>
        <Grid item>
          <MoreLink text={viewMoreText} viewMoreUrl={viewMoreUrl} />
        </Grid>
      </Grid>
      {children}
    </Grid>
  );
};

const MoreLink = ({ text, viewMoreUrl }) => {
  return (
    <LinkText to={viewMoreUrl}>
      <Grid
        container
        direction='row'
        alignItems='center'
        className='MuiTypography-colorPrimary'
        spacing={1}>
        <Grid item>
          <CustomTypography variant='body1'>
            {text}
          </CustomTypography>
        </Grid>
        <Grid item>
          <NextArrow />
        </Grid>
      </Grid>
    </LinkText>
  );
};

const useStyles = makeStyles(() => ({
  marginBottom: {
    marginBottom: '20px',
  },
}));

export default HomePageCard;
