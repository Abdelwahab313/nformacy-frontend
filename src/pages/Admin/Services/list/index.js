import React from 'react';
import GridItem from '../../../../components/grid/GridItem';

import Card from '../../../../components/card/Card';
import CardBody from '../../../../components/card/CardBody';
import GridContainer from '../../../../components/grid/GridContainer';
import ServicesTable from './ServicesTable';
import useFetchData from 'hooks/useFetchData';
import { fetchServices } from 'apis/servicesAPI';
import LoadingCircle from 'components/progress/LoadingCircle';

const ServicesList = () => {
  const { fetchedData: services, isLoading } = useFetchData(fetchServices);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <ServicesTable services={services} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ServicesList;
