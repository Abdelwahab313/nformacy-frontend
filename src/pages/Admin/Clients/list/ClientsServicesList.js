import React from 'react';
import GridItem from '../../../../components/grid/GridItem';
import Card from '../../../../components/card/Card';
import CardBody from '../../../../components/card/CardBody';
import GridContainer from '../../../../components/grid/GridContainer';
import ClientDetailsView from 'templates/clients/ClientDetailsView';
import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchCorporateActivities from 'hooks/useFetchCorporateActivities';
import { useLocation } from 'react-router';

const ClientsServicesList = () => {
  const location = useLocation();
  const userId = location?.state?.clientId;

  const { activities: services, isLoading } = useFetchCorporateActivities(userId);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <ClientDetailsView services={services} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ClientsServicesList;
