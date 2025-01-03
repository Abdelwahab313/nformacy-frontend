import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import React, { Fragment } from 'react';
import TimerBoxSection from './TimerBoxSection';
import { useStyles } from 'styles/TimerBoxSectionStyles';

function CountdownBoxShape({ days, hours, minutes, completed, translation }) {
  const classes = useStyles();
  const { t } = useTranslation();


  return (
    <Fragment>
      {completed ? (
        <Typography className={classes.closedQuestion}>{t('closed')}</Typography>
      ) : (
        <Grid container>
          <TimerBoxSection
            item
            md={4}
            xs={4}
            time={days}
            text={translation('questionRoaster:day')}
          />
          <TimerBoxSection item md={4} xs={4} time={hours} text={translation('questionRoaster:hour')} />
          <TimerBoxSection item md={4} xs={4} time={minutes} text={translation('questionRoaster:minute')} />
        </Grid>
      )}
    </Fragment>
  );
}

export default CountdownBoxShape;
