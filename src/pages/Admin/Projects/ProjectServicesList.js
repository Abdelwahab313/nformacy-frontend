import React from 'react';
import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchData from 'hooks/useFetchData';
import { fetchProjectServices } from 'apis/projectsAPI';
import ServicesTable from 'templates/services/ServicesTable';
import useLocationState from 'hooks/useLocationState';

const ProjectServicesList = () => {
  const projectId = useLocationState((state) => state?.projectId);

  const { fetchedData: services, isLoading } = useFetchData(() =>
    fetchProjectServices(projectId),
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  return <ServicesTable services={services} />;
};

export default ProjectServicesList;
