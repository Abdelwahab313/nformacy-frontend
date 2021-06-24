import React from 'react';
import GridItem from '../../../../components/grid/GridItem';

import Card from '../../../../components/card/Card';
import CardBody from '../../../../components/card/CardBody';
import GridContainer from '../../../../components/grid/GridContainer';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';
import ProjectConsultantsTable from './ProjectConsultantsTable';
import { fetchProjectConsultants } from 'apis/projectsAPI';

const ProjectConsultantsList = () => {
  const { fetchedData: consultants, isLoading } = useFetchData(() => {
    return fetchProjectConsultants();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <ProjectConsultantsTable consultants={consultants} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ProjectConsultantsList;
