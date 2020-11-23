import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LinkText from 'components/typography/LinkText';

const HomePageCard = ({ title, viewMoreUrl, children }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid container>
      <Grid
        container
        direction={'row'}
        justify='space-between'
        className={classes.marginBottom}>
        <Grid item>
          <Typography variant='h6' className={classes.headerTitle}>
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <LinkText to={viewMoreUrl}>
            <Grid container direction='row'>
              <Typography variant='h6'>{t('viewAll')}</Typography>
              <ArrowForwardIcon />
            </Grid>
          </LinkText>
        </Grid>
      </Grid>
      {children}
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  marginBottom: {
    marginBottom: '20px',
  },
  headerTitle: {
    fontWeight: 'bold',
  },
}));

export default HomePageCard;
