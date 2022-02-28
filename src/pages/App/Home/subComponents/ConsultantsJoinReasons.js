import React from 'react';
import { Box, Grid } from '@material-ui/core';
import useStyles from '../styles/HomePageStyles';
import { useTranslation } from 'react-i18next';
import classNames from 'clsx';

import CustomTypography from 'components/typography/Typography';

const ConsultantsJoinReasons = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';
  const Reasons = (t) => [
    {
      title: t('reasonOne'),
      Description: t('reasonOneDesc'),
      icon: require('../../../../assets/consultant/track_monitor.svg'),
    },
    {
      title: t('reasonTwo'),
      Description: t('reasonTwoDesc'),
      icon: require('../../../../assets/consultant/special_services.svg'),
    },
    {
      title: t('reasonThree'),
      Description: t('reasonThreeDesc'),
      icon: require('../../../../assets/consultant/Answers.svg'),
    },
    {
      title: t('reasonFour'),
      Description: t('reasonFourDesc'),
      icon: require('../../../../assets/consultant/reward.svg'),
    },
  ];

  return (
    <Grid container direction={ isArlang? 'row-reverse':'initial'} justify='space-between' >
      {Reasons(t).map((reason) => (
        <Grid item xs={12} md={6}>
                 <Box className={classes.reasonDetailsBox}>

            <MobileReasonItem reason={reason} />
            <ReasonItem reason={reason} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

const MobileReasonItem = ({ reason }) => {
  const classes = useStyles();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';
  return (
    <Grid
      container
      className={classNames(classes.mobileVisible, {
        [classes.mobileVisibleAr]: isArlang,
      },[classes.mobileServicePadding])}
     >
      <Grid item xs={8}>
        <Box padding={2}>
          <CustomTypography
            variant='body1'
            fontWeight='bold'
            gutterBottom
            className={classes.darkBlueText}>
            {reason.title}
          </CustomTypography>
          <CustomTypography variant='body1'>
            {reason.Description}
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={3} className={classes.flexClass}>
        <img src={reason.icon} className={classes.reasonIcon} />
      </Grid>
    </Grid>
  );
};

const ReasonItem = ({ reason }) => {
  const classes = useStyles();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';
  return (
    <Grid container 
     className={classNames(classes.flexDesktopVisible, {
      [classes.flexDesktopVisibleAr]: isArlang,
    })}
    >
      <Grid item xs={8} md={9}>
        <Box padding={5}>
          <CustomTypography
            variant='h5'
            fontWeight='bold'
            gutterBottom
            className={classes.darkBlueText}>
            {reason.title}
          </CustomTypography>
          <CustomTypography variant='body1' fontWeight='light'>
            {reason.Description}
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={3} md={3} className={[classes.flexClass, classes.reasonDetailsImgContainer]}>
        <img src={reason.icon} className={classes.reasonIcon} />
      </Grid>
    </Grid>
  );
};

export default ConsultantsJoinReasons;
