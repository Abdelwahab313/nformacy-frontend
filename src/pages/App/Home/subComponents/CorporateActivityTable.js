import React from 'react';
import { useTranslation } from 'react-i18next';
import LoadingCircle from 'components/progress/LoadingCircle';
import parseServicesToTableRows from 'templates/services/parseServicesToTableRows';
import useFetchCorporateActivities from 'hooks/useFetchCorporateActivities';
import authManager from 'services/authManager';
import ServicesStyledTable from 'templates/services/ServicesStyledTable';


const CorporateActivityTable = () => {
  const { t } = useTranslation();
  const currentUser = authManager.retrieveCurrentUser();
  const { activities: services, isLoading } = useFetchCorporateActivities(
    currentUser.id,
  );
  const servicesRows = parseServicesToTableRows(services, t);

  if (isLoading) {
    return <LoadingCircle />;
  }
  
  return <ServicesStyledTable services={servicesRows} isMultiUser={true} />;
};

export default CorporateActivityTable;
