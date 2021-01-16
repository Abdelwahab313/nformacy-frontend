import {
  Box,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './styles/LandingPageStyles';

const AdvisoryBoardSection = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid
      container
      direction='row'
      justify='center'
      className={classes.landingSectionsContainerPadding}>
      <Grid item xs={12}>
        <Box textAlign='center'>
          <CustomTypography variant='h4' fontWeight='bold'>
            {t('boardOfAdvisors')}
          </CustomTypography>
          <CustomTypography variant='h5' className={classes.subTextMargin}>
            {t('boardOfAdvisorsDesc')}
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={12} className={classes.subTextMargin}>
        <Grid container direction='row' justify='space-between'>
          <GridList cellHeight={320}>
            {/* advisor */}
            <GridListTile key={'img1'} className={classes.tileItem}>
              <img
                src={require('../../../assets/emptyavatar.jpg')}
                alt={'title'}
              />
              <GridListTileBar
                className={classes.tileBarContainer}
                title={
                  <CustomTypography
                    variant={'body1'}
                    fontWeight={'bold'}
                    className={classes.tileSpacing}>
                    Title
                  </CustomTypography>
                }
                subtitle={
                  <Box className={classes.tileSubTitleTxt}>
                    <CustomTypography
                      variant={'body2'}
                      fontWeight={'bold'}
                      className={classes.tileSpacing}>
                      subtitle
                    </CustomTypography>
                    <CustomTypography
                      variant={'body1'}
                      className={classes.tileSpacing}>
                      Behind all your interactions in nformacy there is a Core
                      Team of Advisors dedicated to provide you with high
                      quality reliable services. The Advisory Board makes sure
                      you are matched with the best fit consultant for your
                      requirements and business needs. In addition to managing
                      the quality control process on every interaction you have
                      with nformacy.
                    </CustomTypography>
                  </Box>
                }
              />
            </GridListTile>
            {/* end advisor */}
            {/* advisor */}
            <GridListTile key={'img2'} className={classes.tileItem}>
              <img
                src={require('../../../assets/emptyavatar.jpg')}
                alt={'title'}
              />
              <GridListTileBar
                className={classes.tileBarContainer}
                title={
                  <CustomTypography
                    variant={'body1'}
                    fontWeight={'bold'}
                    className={classes.tileSpacing}>
                    Title
                  </CustomTypography>
                }
                subtitle={
                  <Box className={classes.tileSubTitleTxt}>
                    <CustomTypography
                      variant={'body2'}
                      fontWeight={'bold'}
                      className={classes.tileSpacing}>
                      subtitle
                    </CustomTypography>
                    <CustomTypography
                      variant={'body1'}
                      className={classes.tileSpacing}>
                      Behind all your interactions in nformacy there is a Core
                      Team of Advisors dedicated to provide you with high
                      quality reliable services. The Advisory Board makes sure
                      you are matched with the best fit consultant for your
                      requirements and business needs. In addition to managing
                      the quality control process on every interaction you have
                      with nformacy.
                    </CustomTypography>
                  </Box>
                }
              />
            </GridListTile>
            {/* end advisor */}
            {/* advisor */}
            <GridListTile key={'img3'} className={classes.tileItem}>
              <img
                src={require('../../../assets/emptyavatar.jpg')}
                alt={'title'}
              />
              <GridListTileBar
                className={classes.tileBarContainer}
                title={
                  <CustomTypography
                    variant={'body1'}
                    fontWeight={'bold'}
                    className={classes.tileSpacing}>
                    Title
                  </CustomTypography>
                }
                subtitle={
                  <Box className={classes.tileSubTitleTxt}>
                    <CustomTypography
                      variant={'body2'}
                      fontWeight={'bold'}
                      className={classes.tileSpacing}>
                      subtitle
                    </CustomTypography>
                    <CustomTypography
                      variant={'body1'}
                      className={classes.tileSpacing}>
                      Behind all your interactions in nformacy there is a Core
                      Team of Advisors dedicated to provide you with high
                      quality reliable services. The Advisory Board makes sure
                      you are matched with the best fit consultant for your
                      requirements and business needs. In addition to managing
                      the quality control process on every interaction you have
                      with nformacy.
                    </CustomTypography>
                  </Box>
                }
              />
            </GridListTile>
            {/* end advisor */}
            {/* advisor */}
            <GridListTile key={'img4'} className={classes.tileItem}>
              <img
                src={require('../../../assets/emptyavatar.jpg')}
                alt={'title'}
              />
              <GridListTileBar
                className={classes.tileBarContainer}
                title={
                  <CustomTypography
                    variant={'body1'}
                    fontWeight={'bold'}
                    className={classes.tileSpacing}>
                    Title
                  </CustomTypography>
                }
                subtitle={
                  <Box className={classes.tileSubTitleTxt}>
                    <CustomTypography
                      variant={'body2'}
                      fontWeight={'bold'}
                      className={classes.tileSpacing}>
                      subtitle
                    </CustomTypography>
                    <CustomTypography
                      variant={'body1'}
                      className={classes.tileSpacing}>
                      Behind all your interactions in nformacy there is a Core
                      Team of Advisors dedicated to provide you with high
                      quality reliable services. The Advisory Board makes sure
                      you are matched with the best fit consultant for your
                      requirements and business needs. In addition to managing
                      the quality control process on every interaction you have
                      with nformacy.
                    </CustomTypography>
                  </Box>
                }
              />
            </GridListTile>
            {/* end advisor */}
            {/* advisor */}
            <GridListTile key={'img5'} className={classes.tileItem}>
              <img
                src={require('../../../assets/emptyavatar.jpg')}
                alt={'title'}
              />
              <GridListTileBar
                className={classes.tileBarContainer}
                title={
                  <CustomTypography
                    variant={'body1'}
                    fontWeight={'bold'}
                    className={classes.tileSpacing}>
                    Title
                  </CustomTypography>
                }
                subtitle={
                  <Box className={classes.tileSubTitleTxt}>
                    <CustomTypography
                      variant={'body2'}
                      fontWeight={'bold'}
                      className={classes.tileSpacing}>
                      subtitle
                    </CustomTypography>
                    <CustomTypography
                      variant={'body1'}
                      className={classes.tileSpacing}>
                      Behind all your interactions in nformacy there is a Core
                      Team of Advisors dedicated to provide you with high
                      quality reliable services. The Advisory Board makes sure
                      you are matched with the best fit consultant for your
                      requirements and business needs. In addition to managing
                      the quality control process on every interaction you have
                      with nformacy.
                    </CustomTypography>
                  </Box>
                }
              />
            </GridListTile>
            {/* end advisor */}
            {/* advisor */}
            <GridListTile key={'img6'} className={classes.tileItem}>
              <img
                src={require('../../../assets/emptyavatar.jpg')}
                alt={'title'}
              />
              <GridListTileBar
                className={classes.tileBarContainer}
                title={
                  <CustomTypography
                    variant={'body1'}
                    fontWeight={'bold'}
                    className={classes.tileSpacing}>
                    Title
                  </CustomTypography>
                }
                subtitle={
                  <Box className={classes.tileSubTitleTxt}>
                    <CustomTypography
                      variant={'body2'}
                      fontWeight={'bold'}
                      className={classes.tileSpacing}>
                      subtitle
                    </CustomTypography>
                    <CustomTypography
                      variant={'body1'}
                      className={classes.tileSpacing}>
                      Behind all your interactions in nformacy there is a Core
                      Team of Advisors dedicated to provide you with high
                      quality reliable services. The Advisory Board makes sure
                      you are matched with the best fit consultant for your
                      requirements and business needs. In addition to managing
                      the quality control process on every interaction you have
                      with nformacy.
                    </CustomTypography>
                  </Box>
                }
              />
            </GridListTile>
            {/* end advisor */}
          </GridList>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdvisoryBoardSection;
