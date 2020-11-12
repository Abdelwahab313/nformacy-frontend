import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { RoutesPaths } from '../../../../constants/routesPath';
import { Link } from 'react-router-dom';

const services = ['call', 'question', 'project'];


const AvailableServices = () => {
  const { t } = useTranslation();

  return (<Box mt={16}>
    <Typography variant='h6' align='center'>
      {t('home:selectAService')}
    </Typography>
    <Grid container direction={'row'} justify={'center'}>
      {services.map((service) => (<ServiceItem service={service}/>))}
    </Grid>
  </Box>);
};


const ServiceItem = ({ service }) => {
  const classes = useStyles();
  const { t } = useTranslation();


  return (<Grid item xs={2} sm={2} md={2}>
    <Link
      id={`service-${service}-btn`}
      className={classes.link}
      to={{
        pathname: RoutesPaths.App.ServiceRequestDetails,
        state: { serviceType: service },
      }}>
      <Box mt={4} p={4} className={classes.item}>
        <Typography align='center'>
          {t(`common:${service}`)}
        </Typography>
      </Box>
    </Link>
  </Grid>);
};

const useStyles = makeStyles((theme) => ({
  item: {
    marginRight: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 16,
  },
  link: {
    textDecoration: 'none',
  },
}));
export default AvailableServices;