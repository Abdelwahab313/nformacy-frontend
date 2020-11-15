import React from 'react';
import GridItem from '../../../components/grid/GridItem';

import Card from '../../../components/card/Card';
import CardBody from '../../../components/card/CardBody';
import ServicesTable from '../../Admin/Services/ServicesTable';
import useFetchData from 'hooks/useFetchData';
import { fetchClientServices } from 'apis/servicesAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import { Box } from '@material-ui/core';

const ServicesPage = () => {
  const { fetchedData: services, isLoading } = useFetchData(fetchClientServices);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Box mx="auto">
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='ServicesList'>
            <ServicesTable services={services} />
          </CardBody>
        </Card>
      </GridItem>
    </Box>
  );
};

export default ServicesPage;
