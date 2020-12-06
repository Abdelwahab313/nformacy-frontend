import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import useStyles from './../styles/HomePageStyles';
import SubmitButton from 'components/buttons/SubmitButton';
import Collapse from '@material-ui/core/Collapse';
import HomePageCard from './HomePageCard';
import { RoutesPaths } from 'constants/routesPath';
import { useTranslation } from 'react-i18next';
import CustomTypography from 'components/typography/Typography';
import { useHistory } from 'react-router';

const services = (t) => [
  {
    name: 'call',
    title: t('callServiceTitle'),
    description: t('callServiceDescription'),
    icon: require('../../../../assets/client-call.svg'),
    btnTxt: t('callServiceButton'),
  },
  {
    name: 'question',
    title: t('questionServiceTitle'),
    description: t('questionServiceDescription'),
    icon: require('../../../../assets/consultant.png'),
    btnTxt: t('questionServiceButton'),
  },
  {
    name: 'project',
    title: t('projectServiceTitle'),
    description: t('projectServiceDescription'),
    icon: require('../../../../assets/client-project.svg'),
    btnTxt: t('projectServiceButton'),
  },
];

const AvailableServices = () => {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const [focusedItem, setFocusedItem] = useState('');

  const navigatToServiceForm = (type) => {
    history.push(RoutesPaths.App.ServiceRequestDetails, {
      service: { assignmentType: type },
    });
  };

  return (
    <HomePageCard
      title={''}
      viewMoreText={t('seeMore')}
      viewMoreUrl={RoutesPaths.Admin.Home}>
      <Grid
        container
        className={classes.threeBtnsContainer}
        justify='space-between'
        spacing={4}>
        {services(t).map((service) => (
          <Grid item xs={4} md={4}>
            <Box className={[classes.askQuestionBox, classes.clientThreeBtns]}>
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
    </HomePageCard>
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
        <img src={service.icon} className={classes.clientImg} />
      </Grid>
      <Grid container xs={12}>
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
    <Collapse
      in={isFocused}
      collapsedHeight={150}
      timeout={500}
      className={classes.desktopVisible}>
      <Grid
        container
        onMouseEnter={() => setFocusedItem(service.name)}
        onMouseLeave={() => setFocusedItem('')}>
        <Grid item xs={8} md={9}>
          <CustomTypography variant='h6' fontWeight='bold'>
            {service.title}
          </CustomTypography>
          <CustomTypography
            variant='body1'
            fontWeight='light'
            className={classes.serviceDesc}>
            {service.description}
          </CustomTypography>
        </Grid>
        <Grid item xs={3} md={3}>
          <img src={service.icon} className={classes.clientImg} />
        </Grid>
        <Grid container xs={12}>
          {isFocused && (
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
          )}
        </Grid>
      </Grid>
    </Collapse>
  );
};

export default AvailableServices;
