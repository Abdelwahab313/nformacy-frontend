import React from 'react';
import GridItem from '../../../../components/grid/GridItem';

import Card from '../../../../components/card/Card';
import CardBody from '../../../../components/card/CardBody';
import GridContainer from '../../../../components/grid/GridContainer';
import ClientsTable from 'templates/clients/ClientsTable';
import LoadingCircle from 'components/progress/LoadingCircle';
import { fetchClients } from 'apis/clientsAPI';
import useFetchData from 'hooks/useFetchData';

const ClientsList = () => {
  const { fetchedData: clients, isLoading } = useFetchData(() => {
    return fetchClients();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <ClientsTable clients={clients} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ClientsList;
