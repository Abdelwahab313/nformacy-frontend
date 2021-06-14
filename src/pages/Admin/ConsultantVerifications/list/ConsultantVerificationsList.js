import React from 'react';
import GridItem from 'components/grid/GridItem';
import Card from 'components/card/Card';
import CardBody from 'components/card/CardBody';
import GridContainer from 'components/grid/GridContainer';
import LoadingCircle from 'components/progress/LoadingCircle';
import ConsultantVerificationTable from './ConsultantVerificationTable';
import useFetchData from 'hooks/useFetchData';
import { fetchAdminMeetings } from 'apis/meetingsAPI';

const ConsultantVerificationsList = () => {

  const { fetchedData: meetings, isLoading } = useFetchData(fetchAdminMeetings);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <ConsultantVerificationTable meetings={meetings} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer >
  );
};

export default ConsultantVerificationsList;
