import React, { useEffect, useState }  from 'react';

import GridContainer from 'components/grid/GridContainer.js';
import GridItem from 'components/grid/GridItem.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';
import { useLocation } from 'react-router';
import LoadingCircle from 'components/progress/LoadingCircle';
import { fetchServiceDetails } from 'apis/servicesAPI';


import { Typography } from '@material-ui/core';



const ServiceDetails = () => {
    const location = useLocation();
    const serviceId = location?.state?.serviceId;
    const [isLoading, setIsLoading] = useState(false);
    const isNewService = !serviceId;

    useEffect(() => {
        setIsLoading(true);
        fetchServiceDetails(serviceId)
          .then((response) => {
            console.log("response--------------", response);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, []);

      if (isLoading) {
        return <LoadingCircle/>;
      }
      
    return (
        <GridContainer justifyContent={'center'}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color='primary'>
                <Typography component={'h4'} id={'post-service-page-header'}>
                  {isNewService ? 'Add Service' : 'Edit Service'}
                </Typography>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>
      );
};

export default ServiceDetails;