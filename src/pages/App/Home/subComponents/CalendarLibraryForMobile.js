import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from '../styles/HomePageStyles';
import { useTranslation } from 'react-i18next';
import CustomTypography from 'components/typography/Typography';
import NextArrow from 'components/icons/NextArrow';
import ComingSoonWrapper from 'components/grid/ComingSoonWrapper';

export const CalendarLibraryForMobile = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid
      container
      justify='space-between'
      className={classes.calendarLibraryContainer}>
      <Grid item xs={5} className={classes.calendarMobileBox}>
        <ComingSoonWrapper>
          <div className={classes.calendarMarginBottom}>
            <img
              color={'primary'}
              src={require('../../../../assets/icons/calendar.svg')}
              width={'30px'}
            />
          </div>
          <CustomTypography
            className={classes.calendarMarginBottom}
            variant='body2'>
            {t('calendarOfEvents')}
          </CustomTypography>
          <CustomTypography
            className={classes.calendarMarginBottom}
            variant='body2'>
            {t('fullView') + '  '}
            <NextArrow />
          </CustomTypography>
        </ComingSoonWrapper>
      </Grid>
      <Grid
        item
        xs={5}
        className={[classes.calendarMobileBox, classes.goToLibraryMobileBox]}>
        <ComingSoonWrapper>
          <div className={classes.calendarMarginBottom}>
            <img
              color={'primary'}
              src={require('../../../../assets/icons/library.svg')}
              width={'30px'}
            />
          </div>
          <CustomTypography
            className={classes.calendarMarginBottom}
            variant='body2'>
            {t('libraryResources')}
          </CustomTypography>
          <CustomTypography
            className={classes.calendarMarginBottom}
            variant='body2'>
            {t('goToLibrary')}
            <NextArrow />
          </CustomTypography>
        </ComingSoonWrapper>
      </Grid>
    </Grid>
  );
};
