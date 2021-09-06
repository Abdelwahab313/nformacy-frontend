import { Grid } from '@material-ui/core';
import clsx from 'clsx';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './styles/LandingPageStyles';

const nformacy360Logo = require('../../../assets/nformacy360.png');

const Nformacy360 = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems={'center'}
      className={clsx(
        classes.landingSectionsContainerPadding,
        classes.lighterGrayContainer,
      )}>
      <CustomTypography variant={'h2'} fontWeight={'bold'}>
        {t('comingSoon')}
      </CustomTypography>
      <img
        className={classes.nformacy360LogoSize}
        src={nformacy360Logo}
      />
    </Grid>
  );
};

export default Nformacy360;
