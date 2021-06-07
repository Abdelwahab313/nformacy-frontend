import React from 'react';
import GridItem from '../../../../components/grid/GridItem';
import Card from '../../../../components/card/Card';
import CardBody from '../../../../components/card/CardBody';
import GridContainer from '../../../../components/grid/GridContainer';
import LoadingCircle from 'components/progress/LoadingCircle';
import { useLocation } from 'react-router';
import { getUser } from 'apis/userAPI';
import useFetchData from 'hooks/useFetchData';
import CustomTypography from 'components/typography/Typography';
import ConsultantDetailsView from 'templates/consultants/ConsultantDetailsView';
import { fetchFreelancerAnswers } from 'apis/answersAPI';

const ConsultantsServicesList = () => {
  const location = useLocation();
  const consultantId = location?.state?.consultantId;

  const { fetchedData: activities, isLoading } = useFetchData(() => fetchFreelancerAnswers(consultantId));

  const { fetchedData: users } = useFetchData(() => {
    return getUser(consultantId);
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CustomTypography fontWeight='bold'>
          {users.firstName + ' ' + users.lastName}
        </CustomTypography>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <ConsultantDetailsView activities={activities} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer >
  );
};

export default ConsultantsServicesList;
