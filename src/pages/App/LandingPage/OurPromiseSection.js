import { Box, Divider, Grid } from '@material-ui/core';
import ShowMore from 'components/typography/ShowMore';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import classNames from 'clsx';
import { useTranslation } from 'react-i18next';
import { greyDividerStyle } from 'styles/formsStyles';
import useStyles from './styles/LandingPageStyles';

const OurPromiseSection = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';

  return (
    <Grid
      container
      direction='row'
      justify='center'
      className={[
        classes.landingSectionsContainerPadding,
        classes.lighterGrayContainer,
      ]}>
      <Grid item xs={12}>
        <Box textAlign='center'>
          <CustomTypography variant='h4' fontWeight='bold'>
            {t('ourPromise')}
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction='row' justify='space-between'>
          {/* Great Consultants */}
          <Grid
            item
            xs={11}
            md={4}
            className={[classes.promiseField, classes.fitContent]}>
            <Box className={classes.specialityFieldPadding}>
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.orangeMainText}>
                {t('theBestAmongGreatConsultants')}
              </CustomTypography>
              <Divider
                variant='middle'
                style={greyDividerStyle}
                className={classes.desktopVisible}
              />
              <Box
                className={classNames(
                  classes.promiseFieldDescTxt,
                  {
                    [classes.promiseFieldDescTxtAr]: isArlang,
                  },
                  classes.desktopVisible,
                )}>
                <ShowMore withTxt={false} numberOfLines={5}>
                  {t('theBestAmongGreatConsultantsDesc')}
                </ShowMore>
              </Box>
            </Box>
          </Grid>
          {/* end Great Consultants */}
          {/* Quality is Assured  */}
          <Grid
            item
            xs={11}
            md={4}
            className={[classes.promiseField, classes.fitContent]}>
            <Box textAlign='left' className={classes.specialityFieldPadding}>
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.orangeMainText}>
                {t('qualityIsAssured')}
              </CustomTypography>
              <Divider
                variant='middle'
                style={greyDividerStyle}
                className={classes.desktopVisible}
              />
              <Box
                className={classNames(
                  classes.promiseFieldDescTxt,
                  {
                    [classes.promiseFieldDescTxtAr]: isArlang,
                  },
                  classes.desktopVisible,
                )}>
                <ShowMore withTxt={false} numberOfLines={5}>
                  {t('qualityIsAssuredDesc')}
                </ShowMore>
              </Box>
            </Box>
          </Grid>
          {/* end Quality is Assured  */}
          {/* We Understand Your Needs */}
          <Grid
            item
            xs={11}
            md={4}
            className={[classes.promiseField, classes.fitContent]}>
            <Box textAlign='left' className={classes.specialityFieldPadding}>
              <CustomTypography
                variant='h6'
                fontWeight='bold'
                className={classes.orangeMainText}>
                {t('weUnderstandYourNeeds')}
              </CustomTypography>
              <Divider
                variant='middle'
                style={greyDividerStyle}
                className={classes.desktopVisible}
              />
              <Box
                className={classNames(
                  classes.promiseFieldDescTxt,
                  {
                    [classes.promiseFieldDescTxtAr]: isArlang,
                  },
                  classes.desktopVisible,
                )}>
                <ShowMore withTxt={false} numberOfLines={5}>
                  {t('weUnderstandYourNeedsDesc')}
                </ShowMore>
              </Box>
            </Box>
          </Grid>
          {/* end We Understand Your Needs */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OurPromiseSection;
