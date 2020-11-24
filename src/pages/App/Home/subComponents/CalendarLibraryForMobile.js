import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from '../styles/HomePageStyles';
import { useTranslation } from 'react-i18next';

export const CalendarLibraryForMobile = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container justify="space-between" className={classes.calendarLibraryContainer}>
      <Grid item xs={5} className={classes.calendarMobileBox}>
        <div className={classes.calendarMarginBottom}>
          <img
            className={[classes.walletIcon]}
            color={'primary'}
            src={require('../../../../assets/wallet.svg')}
            width={'25%'}
          />
        </div>
        <div className={classes.calendarMarginBottom}>{t('calendarOfEvents')}</div>
        <div className={classes.calendarMarginBottom}>
          {t('fullView')}
        </div>
      </Grid>
      <Grid item xs={5} className={[classes.calendarMobileBox, classes.goToLibraryMobileBox]}>
        <div className={classes.calendarMarginBottom}>
          <img
            className={[classes.walletIcon]}
            color={'primary'}
            src={require('../../../../assets/wallet.svg')}
            width={'25%'}
          />
        </div>
        <div className={classes.calendarMarginBottom}>{t('libraryResources')}</div>
        <div className={classes.calendarMarginBottom}>
        {t('goToLibrary')}
        </div>
      </Grid>
    </Grid>
  )
}