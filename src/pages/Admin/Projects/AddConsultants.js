import React from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import AddConsultantsTable from './AddConsultantsTable';
import { fetchConsultantsList } from 'apis/projectsAPI';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';

const AddConsultants = () => {

  const { fetchedData: projects, isLoading } = useFetchData(() => {
    return fetchConsultantsList();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <AddConsultantsTable
          projects={projects}
          primaryButton={{
            id: 'createAdviserButton',
            onClick: () => {},
            buttonText: 'Add Consultants',
          }}
        />
      </GridItem>
    </GridContainer>
  );
};
export default AddConsultants;
