import React from 'react';
import { useTranslation } from 'react-i18next';
import LoadingCircle from 'components/progress/LoadingCircle';
import parseServicesToTableRows from 'templates/services/parseServicesToTableRows';
import useFetchClientActivities from 'hooks/useFetchClientActivities';
import ServicesStyledTable from 'templates/services/ServicesStyledTable';

const ClientActivityTable = () => {
  const { t } = useTranslation();
  const { activities: services, isLoading } = useFetchClientActivities();
  const servicesRows = parseServicesToTableRows(services, t);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return <ServicesStyledTable services={servicesRows} isMultiUser={false} />;
};

export default ClientActivityTable;
