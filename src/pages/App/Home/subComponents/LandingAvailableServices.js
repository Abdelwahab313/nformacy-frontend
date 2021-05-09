import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import useStyles from '../styles/HomePageStyles';
import SubmitButton from 'components/buttons/SubmitButton';
import { RoutesPaths } from 'constants/routesPath';
import { useTranslation } from 'react-i18next';
import CustomTypography from 'components/typography/Typography';
import { useHistory } from 'react-router';
import authManager from 'services/authManager';

const services = (t) => [
  {
    name: 'ask',
    title: t('askServiceTitle'),
    description: t('askServiceDescription'),
    icon: require('../../../../assets/ask_experts.svg'),
    WhiteIcon: require('../../../../assets/white_ask_experts.svg'),
    btnTxt: t('askServiceButton'),
  },
  {
    name: 'call',
    title: t('callServiceTitle'),
    description: t('callServiceDescription'),
    icon: require('../../../../assets/client-call.svg'),
    WhiteIcon: require('../../../../assets/white-client-call.svg'),
    btnTxt: t('callServiceButton'),
  },
  {
    name: 'question',
    title: t('assignExpertServiceTitle'),
    description: t('assignExpertServiceDescription'),
    icon: require('../../../../assets/consultant.png'),
    WhiteIcon: require('../../../../assets/white-consultant.svg'),
    btnTxt: t('assignExpertServiceButton'),
  },
  {
    name: 'project',
    title: t('projectServiceTitle'),
    description: t('projectServiceDescription'),
    icon: require('../../../../assets/client-project.svg'),
    WhiteIcon: require('../../../../assets/white-client-project.svg'),
    btnTxt: t('projectServiceButton'),
  },
];

const LandingAvailableServices = () => {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const [focusedItem, setFocusedItem] = useState('');

  const navigatToServiceForm = (type) => {
    const authToken = authManager.retrieveUserToken();
    if (typeof authToken === 'undefined' || !!authToken) {
      history.push(RoutesPaths.App.EditQuestion, {
        service: { assignmentType: type },
      });
    }
  };

  return (
    <Grid container justify='space-between'>
      {services(t).map((service) => (
        <Grid
          item
          xs={6}
          md={6}
          className={classes.mobileLandingServiceContainer}>
          <Box
            className={[
              classes.askQuestionBox,
              classes.LandingClientThreeBtns,
            ]}>
            <MobileServiceItem
              service={service}
              onServiceClick={() => navigatToServiceForm(service.name)}
            />
            <ServiceItem
              service={service}
              isFocused={service.name === focusedItem}
              setFocusedItem={setFocusedItem}
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
  return (
    <Grid container className={classes.mobileVisible}>
      <Grid item xs={8} md={9}>
        <CustomTypography variant='body2'>{service.title}</CustomTypography>
      </Grid>
      <Grid item xs={3} md={3}>
        <img src={service.WhiteIcon} className={classes.clientImg} />
      </Grid>
      <Grid container>
        <SubmitButton
          id={'proceedBtn'}
          onClick={() => onServiceClick()}
          className={[classes.proceedBtn, classes.startProcessBtn]}
          buttonText={
            <CustomTypography variant='caption'>
              {service.btnTxt}
            </CustomTypography>
          }
        />
      </Grid>
    </Grid>
  );
};

const ServiceItem = ({
  service,
  isFocused,
  setFocusedItem,
  onServiceClick,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.flexDesktopVisible}
      onMouseEnter={() => setFocusedItem(service.name)}
      onMouseLeave={() => setFocusedItem('')}>
      <Grid item xs={8} md={9}>
        <CustomTypography variant='h6' fontWeight='bold'>
          {service.title}
        </CustomTypography>
        <CustomTypography variant='body1' fontWeight='light'>
          {service.description}
        </CustomTypography>
      </Grid>
      <Grid item xs={3} md={3}>
        <img
          src={isFocused ? service.icon : service.WhiteIcon}
          className={classes.clientImg}
        />
      </Grid>
      <Grid container>
        <SubmitButton
          id={'proceedBtn'}
          onClick={() => onServiceClick()}
          className={[classes.proceedBtn, classes.startProcessBtn]}
          buttonText={
            <CustomTypography variant='body1'>
              {service.btnTxt}
            </CustomTypography>
          }
        />
      </Grid>
    </Grid>
  );
};

export default LandingAvailableServices;
