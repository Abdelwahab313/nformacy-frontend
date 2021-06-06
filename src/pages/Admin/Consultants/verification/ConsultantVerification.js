import React from 'react';
import GridItem from '../../../../components/grid/GridItem';
import Card from '../../../../components/card/Card';
import CardBody from '../../../../components/card/CardBody';
import GridContainer from '../../../../components/grid/GridContainer';
import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchCorporateActivities from 'hooks/useFetchCorporateActivities';
import { useLocation } from 'react-router';
import ConsultantVerificationTable from './ConsultantVerificationTable';

const ConsultantVerification = () => {
  const location = useLocation();
  const consultantId = location?.state?.consultantId;

  const { activities: services, isLoading } = useFetchCorporateActivities(consultantId);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <ConsultantVerificationTable services={services} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer >
  );
};

export default ConsultantVerification;
