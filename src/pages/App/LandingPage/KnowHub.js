import { Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './styles/LandingPageStyles';

const KnowHubPage = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems={'center'}
      className={[
        classes.landingSectionsContainerPadding,
        classes.lighterGrayContainer,
      ]}>
      <CustomTypography variant={'h2'} fontWeight={'bold'}>
        {t('comingSoon')}
      </CustomTypography>
    </Grid>
  );
};

export default KnowHubPage;
