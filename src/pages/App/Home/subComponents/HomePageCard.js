import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import LinkText from 'components/typography/LinkText';

const HomePageCard = ({ title, viewMoreUrl, viewMoreText, children }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid
        container
        direction={'row'}
        justify='space-between'
        className={classes.marginBottom}>
        <Grid item>
          <Typography variant='h6' className={classes.boldTitle}>
            {title}
          </Typography>
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
  const classes = useStyles();

  return (
    <LinkText to={viewMoreUrl}>
      <Grid
        container
        direction='row'
        alignItems='center'
        className='MuiTypography-colorPrimary'
        spacing={1}>
        <Grid item>
          <Typography variant='h6' className={classes.boldTitle}>
            {text}
          </Typography>
        </Grid>
        <Grid item>
          <ArrowForwardIcon />
        </Grid>
      </Grid>
    </LinkText>
  );
};

const useStyles = makeStyles(() => ({
  marginBottom: {
    marginBottom: '20px',
  },
  boldTitle: {
    fontWeight: 'bold',
  },
}));

export default HomePageCard;
