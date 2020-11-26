import React from 'react';
import Card from '@material-ui/core/Card';
import { Box, Grid } from '@material-ui/core';

import useStyles from '../styles/HomePageStyles';
import CustomTypography from 'components/typography/Typography';
import NextArrow from 'components/icons/NextArrow';

const LibraryCard = () => {
  const classes = useStyles();

  return (
    <Card className={[classes.card, classes.darkBackground]}>
      <Grid
        container
        direction='column'
        justify='space-evenly'
        alignItems='center'
        className={classes.cardContainer}>
        <img
          color={'primary'}
          src={require('../../../../assets/icons/library.svg')}
          width={'30px'}
        />
        <CustomTypography align={'center'} variant='h6' fontWeight='bold'>
          Library of Resources
        </CustomTypography>
        <CustomTypography align={'center'} variant='body2'>
          Nunc aliquam felis ac ultricies cursus. In eu felis nisi. Mauris
          ligula leo.
        </CustomTypography>

        <Box className={classes.gotToLibraryBtn}>
          <CustomTypography component='span' align={'center'} variant='body2'>
            Go to Library
          </CustomTypography>
          <NextArrow />
        </Box>
      </Grid>
    </Card>
  );
};

export default LibraryCard;
