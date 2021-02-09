import React from 'react';
import Card from '@material-ui/core/Card';
import { Box, Grid } from '@material-ui/core';

import useStyles from '../styles/HomePageStyles';
import CustomTypography from 'components/typography/Typography';
import NextArrow from 'components/icons/NextArrow';
import { useTranslation } from 'react-i18next';
import ComingSoonWrapper from 'components/grid/ComingSoonWrapper';

const LibraryCard = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card className={[classes.card, classes.darkBackground]}>
      <Grid
        container
        direction='column'
        justify='space-evenly'
        alignItems='center'
        className={classes.cardContainer}>
        <ComingSoonWrapper>
          <img
            color={'primary'}
            src={require('../../../../assets/icons/library.svg')}
            width={'30px'}
          />
          <CustomTypography align={'center'} variant='h6' fontWeight='bold'>
            {t('libraryOfResources')}
          </CustomTypography>
          <CustomTypography align={'center'} variant='body2'>
            Nunc aliquam felis ac ultricies cursus. In eu felis nisi. Mauris
            ligula leo.
          </CustomTypography>

          <Box className={classes.gotToLibraryBtn}>
            <CustomTypography component='span' align={'center'} variant='body2'>
              {t('goToLibrary')}
            </CustomTypography>
            <NextArrow />
          </Box>
        </ComingSoonWrapper>
      </Grid>
    </Card>
  );
};

export default LibraryCard;
