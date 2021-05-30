import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { darkBlue, turquoise, lightOrange } from 'styles/colors';

const CalendarLegend = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.calendarLegend}>
      <Grid container>
        <Grid item xs={4}>
          <Grid container className={classes.freeTime}>
            <Grid item xs={2} align="center">
              <Box className={[classes.calendarLegendColorBox, classes.freeTimeColorBox]}></Box>
            </Grid>
            <Grid item xs={10}>
              <Typography variant={'body2'}>{t('freeTime')}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container className={classes.freeTime}>
            <Grid item xs={2} align="center">
              <Box className={[classes.calendarLegendColorBox, classes.meetingTimeColorBox]}></Box>
            </Grid>
            <Grid item xs={10}>
              <Typography variant={'body2'}>{t('meetingTime')}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container className={classes.freeTime}>
            <Grid item xs={2} align="center">
              <Box className={[classes.calendarLegendColorBox, classes.callTimeColorBox]}></Box>
            </Grid>
            <Grid item xs={10}>
              <Typography variant={'body2'}>{t('callTime')}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  calendarLegend: {
    padding: 10,
    border: '1px solid #e0e0e0',
    marginTop: 30,
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    }
  },
  calendarLegendColorBox: {
    width: 10,
    height: 10,
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  freeTimeColorBox: {
    backgroundColor: darkBlue,
  },
  meetingTimeColorBox: {
    backgroundColor: lightOrange,
  },
  callTimeColorBox: {
    backgroundColor: turquoise,
  }
}));
export default CalendarLegend;