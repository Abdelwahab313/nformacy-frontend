import { useStyles } from 'styles/TimerBoxSectionStyles';
import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import useLocale from '../../hooks/localization/useLocale';
import DEFAULT_LOCALES from '../../constants/locale';

function TimerBoxSection({ time, text }) {
  const classes = useStyles();
  const { locale } = useLocale();
  const localizedTime = new Intl.NumberFormat(DEFAULT_LOCALES[locale]).format(
    time,
  );

  return (
    <Grid container className={classes.counterContainer}>
      <Grid item md={12} xs={12}>
        <Typography className={classes.counterTime}>{localizedTime}</Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography className={classes.counterText}>{text}</Typography>
      </Grid>
    </Grid>
  );
}

export default TimerBoxSection;
