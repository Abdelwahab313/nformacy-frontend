import React from 'react';
import { useLocation } from 'react-router';
import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchData from 'hooks/useFetchData';
import { fetchServiceDetails } from 'apis/servicesAPI';
import ClientServiceDetails from './ClientServiceDetails';
import FreelancerServiceDetails from './FreelancerServiceDetails';
import authManager from 'services/authManager';
import ServiceManager from 'core/serviceManager';
import MentoringServiceDetails from './MentoringServiceDetails';

const ServiceDetails = () => {
  const location = useLocation();
  const serviceId = location?.state?.serviceId;
  const { fetchedData: serviceDetails, isLoading } = useFetchData(() =>
    fetchServiceDetails(serviceId),
  );
  if (isLoading) {
    return <LoadingCircle />;
  }

  if (ServiceManager.isMentoringService(serviceDetails)) {
    return <MentoringServiceDetails serviceDetails={serviceDetails} />;
  }
  if (authManager.isClient()) {
    return <ClientServiceDetails serviceDetails={serviceDetails} />;
  } else {
    return <FreelancerServiceDetails serviceDetails={serviceDetails} />;
  }
};

export default ServiceDetails;
