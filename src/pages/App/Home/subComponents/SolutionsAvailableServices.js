import React from 'react';
import classNames from 'clsx';
import { ArrowForward } from '@material-ui/icons';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Box, Grid } from '@material-ui/core';
import useStyles from '../styles/HomePageStyles';
import SubmitButton from 'components/buttons/SubmitButton';
import { RoutesPaths } from 'constants/routesPath';
import { useTranslation } from 'react-i18next';
import CustomTypography from 'components/typography/Typography';
import { useHistory } from 'react-router';

const SolutionsAvailableServices = () => {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const services = (t) => [
    {
      name: 'ask',
      title: t('askServiceTitle'),
      subTitle: t('askServiceSubTitle'),
      point_1: t('askServicePoint_1'),
      point_2: t('askServicePoint_2'),
      point_3: t('askServicePoint_3'),
      WhiteIcon: require('../../../../assets/white_ask_experts.svg'),
      icon: require('../../../../assets/darkOrangeAskExperts.svg'),
      btnTxt: t('askServiceButton'),
      bGColorClass: classes.darkOrangeBG,
    },
    {
      name: 'call',
      title: t('callServiceTitle'),
      subTitle: t('callServiceSubTitle'),
      point_1: t('callServicePoint_1'),
      point_2: t('callServicePoint_2'),
      point_3: '',
      WhiteIcon: require('../../../../assets/white-client-call.svg'),
      icon: require('../../../../assets/mediumTurquoiseCall.svg'),
      btnTxt: t('callServiceButton'),
      bGColorClass: classes.mediumTurquoiseBG,
    },
    {
      name: 'question',
      title: t('assignExpertServiceTitle'),
      subTitle: t('assignExpertServiceSubTitle'),
      point_1: t('assignExpertServicePoint_1'),
      point_2: t('assignExpertServicePoint_2'),
      point_3: t('assignExpertServicePoint_3'),
      WhiteIcon: require('../../../../assets/white-consultant.svg'),
      icon: require('../../../../assets/lightOrangeConsultant.svg'),
      btnTxt: t('assignExpertServiceButton'),
      bGColorClass: classes.lightOrangeBG,
    },
    {
      name: 'project',
      title: t('projectServiceTitle'),
      subTitle: t('projectServiceSubTitle'),
      point_1: t('projectServicePoint_1'),
      point_2: '',
      point_3: '',
      WhiteIcon: require('../../../../assets/white-client-project.svg'),
      icon: require('../../../../assets/client-project.svg'),
      btnTxt: t('projectServiceButton'),
      bGColorClass: classes.darkBlueBG,
    },
  ];

  const navigatToServiceForm = (type) => {
    history.push(RoutesPaths.App.EditServiceRequest, {
      service: { assignmentType: type },
    });
  };

  return (
    <Grid container justify='space-between'>
      {services(t).map((service, index) => (
        <Grid item xs={12} md={12} className={classes.pointBulletMargin}>
          <Box className={classes.serviceDetailsBox}>
            <MobileServiceItem
              service={service}
              onServiceClick={() => navigatToServiceForm(service.name)}
            />
            <ServiceItem
              service={service}
              index={index}
              onServiceClick={() => navigatToServiceForm(service.name)}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

const MobileServiceItem = ({ service, onServiceClick }) => {
  const classes = useStyles();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';
  return (
    <Grid
      container
      className={[classes.mobileServicePadding, classes.mobileVisible]}>
      <Grid item xs={8}>
        <Box padding={2}>
          <CustomTypography
            variant='body1'
            fontWeight='bold'
            gutterBottom
            className={classNames(classes.darkBlueText, {
              [classes.darkBlueTextAr]: isArlang,
            })}>
            {service.title}
          </CustomTypography>
          <CustomTypography
            variant='body1'
            className={classNames(classes.sectionSubTitle, {
              [classes.sectionSubTitleAr]: isArlang,
            })}>
            {service.subTitle}
          </CustomTypography>
        </Box>
      </Grid>
      <Grid item xs={3} className={classes.flexClass}>
        <img src={service.icon} className={classes.solutionsPageServiceIcon} />
      </Grid>
      <Grid container justify='center' direction={'row-reverse'}>
        <SubmitButton
          id={'proceedBtn'}
          onClick={() => onServiceClick()}
          buttonText={
            <CustomTypography variant='body1' className={classes.flexClass}>
              {service.btnTxt}
              <ArrowForward />
            </CustomTypography>
          }
        />
      </Grid>
    </Grid>
  );
};

const ServiceItem = ({ service, index, onServiceClick }) => {
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';
  const classes = useStyles();
  return (
    <Grid
      container
      className={[
        classes.flexDesktopVisible,
        index % 2 === 0 ? classes.flexDirectionBox : '',
      ]}>
      <Grid
        item
        xs={3}
        md={3}
        className={[
          service.bGColorClass,
          classes.flexClass,
          classes.imgContainerHeight,
        ]}>
        <img
          src={service.WhiteIcon}
          className={classes.solutionsPageServiceIcon}
        />
      </Grid>
      <Grid item xs={8} md={9}>
        <Box padding={5}>
          <CustomTypography
            variant='h5'
            fontWeight='bold'
            gutterBottom
            className={classNames(classes.darkBlueText, {
              [classes.darkBlueTextAr]: isArlang,
            })}>
            {service.title}
          </CustomTypography>
          <CustomTypography
            variant='h6'
            fontWeight='bold'
            className={classNames(classes.sectionSubTitle, {
              [classes.sectionSubTitleAr]: isArlang,
            })}>
            {service.subTitle}
          </CustomTypography>

          <Box
            className={classNames(classes.BoxContainer, {
              [classes.BoxContainerAr]: isArlang,
            })}>
            {service.point_1 && (
              <FiberManualRecordIcon className={classes.pointBullet} />
            )}
            <CustomTypography
              variant='body1'
              fontWeight='light'
              className={classes.pointBulletMargin}>
              {service.point_1}
            </CustomTypography>
          </Box>

          <Box
            className={classNames(classes.BoxContainer, {
              [classes.BoxContainerAr]: isArlang,
            })}>
            {service.point_2 && (
              <FiberManualRecordIcon className={classes.pointBullet} />
            )}
            <CustomTypography
              variant='body1'
              fontWeight='light'
              className={classes.pointBulletMargin}>
              {service.point_2}
            </CustomTypography>
          </Box>

          <Box
            className={classNames(classes.BoxContainer, {
              [classes.BoxContainerAr]: isArlang,
            })}>
            {service.point_3 && (
              <FiberManualRecordIcon className={classes.pointBullet} />
            )}
            <CustomTypography
              variant='body1'
              fontWeight='light'
              className={classes.pointBulletMargin}>
              {service.point_3}
            </CustomTypography>
          </Box>

          <Grid container direction={'row-reverse'}>
            <SubmitButton
              id={'proceedBtn'}
              onClick={() => onServiceClick()}
              buttonText={
                <CustomTypography variant='body1' className={classes.flexClass}>
                  {service.btnTxt}
                  <ArrowForward />
                </CustomTypography>
              }
            />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SolutionsAvailableServices;
