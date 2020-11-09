import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import GridItem from 'components/grid/GridItem';
import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import CardFooter from 'components/card/CardFooter';
import ServiceRequestForm from './ServiceRequestForm';


const ServiceRequestDetails = () => {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();
  const serviceType = location?.state?.serviceType;
  const serviceTitle = t(`common:${serviceType}`);


  return (<Grid container alignItems={'center'} justify={'center'}>
    <GridItem xs={12} sm={12} md={8}>
      <Card>
        <CardHeader color='primary'>
          <Typography component={'h4'} id={'create-service-request-header'}>
            {`Request a ${serviceTitle} Service`}
          </Typography>
        </CardHeader>
        <ServiceRequestForm/>
        <CardFooter className={classes.footerButtons}>
        </CardFooter>
      </Card>
    </GridItem>
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

export default ServiceRequestDetails;