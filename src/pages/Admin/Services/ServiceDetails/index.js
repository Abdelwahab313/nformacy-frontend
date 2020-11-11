import React from 'react';

import GridContainer from 'components/grid/GridContainer.js';
import GridItem from 'components/grid/GridItem.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';

import { Typography } from '@material-ui/core';



const ServiceDetails = () => {
    // const [isLoading, setIsLoading] = useState(false);
    const isNewService = false;
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