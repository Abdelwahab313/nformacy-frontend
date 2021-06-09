import React from 'react';
import { useLocation } from 'react-router';
import GridContainer from 'components/grid/GridContainer.js';
import GridItem from 'components/grid/GridItem.js';
import Card from 'components/card/Card.js';
import MeetingDetailsSection from 'pages/App/ServiceRequests/details/subComponents/MeetingDetailsSection';
import useFetchData from 'hooks/useFetchData';
import { fetchMeetingDetails } from 'apis/meetingsAPI';
import LoadingCircle from 'components/progress/LoadingCircle';


const ConsultantVerificationDetails = () => {
  const location = useLocation();
  const meetingId = location?.state?.meetingId;
  const { fetchedData: meetingDetails, isLoading } = useFetchData(() => fetchMeetingDetails(meetingId))

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer justifyContent={'center'}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <MeetingDetailsSection meeting={meetingDetails} />
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ConsultantVerificationDetails;
