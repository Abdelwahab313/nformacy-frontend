import { Box, Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import React from 'react';
import classNames from 'clsx';
import useStyles from './styles/LandingPageStyles';
import { useTranslation } from 'react-i18next';

const AboutUsGalleryDescription = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';

  return (
    <Grid container direction='row' justify='center'>
      <Grid item xs={12}>
        <Grid container direction='row' justify='space-between'>
          {/* Aliquam desc */}
          <Grid item md={6} className={classes.landingSectionsContainerPadding}>
            <Box>
              <CustomTypography
                variant='h5'
                fontWeight='bold'
                className={classNames(classes.workMainTextPadding, {
                  [classes.workMainTextPaddinAr]: isArlang,
                })}>
                {t('WhyNformacy')}
              </CustomTypography>
              <CustomTypography variant='body1' fontWeight='light'
                 className={classNames(classes.WhyNformacydescription, {
                  [classes.WhyNformacydescriptionAr]: isArlang,
                })}
              >
                {t('WhyNformacydescription')}
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Aliquam desc */}
          {/* Aliquam img */}
          <Grid item md={6}>
            <Box textAlign='center'>
              <img
                className={classes.firstSectionImg}
                src={require('../../../assets/about/communication-aboutPage.jpg')}
              />
            </Box>
          </Grid>
          {/* end Aliquam img */}
          {/* Aliquam img */}
          <Grid item md={6}>
            <Box textAlign='center'>
              <img
                className={classes.firstSectionImg}
                src={require('../../../assets/about/business-aboutPage.jpg')}
              />
            </Box>
          </Grid>
          {/* end Aliquam img */}
          {/* Etiam desc */}
          <Grid item md={6} className={classes.landingSectionsContainerPadding}>
            <Box>
              <CustomTypography
                variant='h5'
                fontWeight='bold'
                className={classNames(classes.workMainTextPadding, {
                  [classes.workMainTextPaddinAr]: isArlang,
                })}>
                {t('WhyNformacy')}
              </CustomTypography>
              <CustomTypography variant='body1' fontWeight='light'
                 className={classNames(classes.WhyNformacydescription, {
                  [classes.WhyNformacydescriptionAr]: isArlang,
                })}
              >
                {t('WhyNformacydescription')}
              </CustomTypography>
            </Box>
          </Grid>
          {/* end Etiam desc */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutUsGalleryDescription;
