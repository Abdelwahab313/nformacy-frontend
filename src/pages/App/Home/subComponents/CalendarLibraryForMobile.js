import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from '../styles/HomePageStyles';
import { useTranslation } from 'react-i18next';
import CustomTypography from 'components/typography/Typography';
import NextArrow from 'components/icons/NextArrow';

export const CalendarLibraryForMobile = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container justify="space-between" className={classes.calendarLibraryContainer}>
      <Grid item xs={5} className={classes.calendarMobileBox}>
        <div className={classes.calendarMarginBottom}>
          <img
            color={'primary'}
            src={require('../../../../assets/wallet.svg')}
            width={'35%'}
          />
        </div>
        <CustomTypography className={classes.calendarMarginBottom} variant='body2'>
          {t('calendarOfEvents')}
        </CustomTypography>
        <CustomTypography className={classes.calendarMarginBottom} variant='body2'>
          {t('fullView') + '  '}
          <NextArrow />
        </CustomTypography>
      </Grid>
      <Grid item xs={5} className={[classes.calendarMobileBox, classes.goToLibraryMobileBox]}>
        <div className={classes.calendarMarginBottom}>
          <img
            color={'primary'}
            src={require('../../../../assets/wallet.svg')}
            width={'35%'}
          />
        </div>
        <CustomTypography className={classes.calendarMarginBottom} variant='body2'>
          {t('libraryResources')}
        </CustomTypography>
        <CustomTypography className={classes.calendarMarginBottom} variant='body2'>
          {t('goToLibrary')}
          <NextArrow />
        </CustomTypography>
      </Grid>
    </Grid>
  )
}