import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { darkBlue } from 'styles/colors';

const CalendarLegend = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.calendarLegend}>
      <Grid container>
        <Grid item xs={2} align="center">
          <Box className={classes.calendarLegendColorBox}></Box>
        </Grid>
        <Grid item xs={10}>
          <Typography variant={'body2'}>{t('availableTime')}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  calendarLegend: {
    width: 300,
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
    backgroundColor: darkBlue,
    display: 'inline-block',
    verticalAlign: 'middle',
  }
}));
export default CalendarLegend;