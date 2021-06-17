import React from 'react';
import { useTranslation } from 'react-i18next';
import HomePageCard from './HomePageCard';
import { RoutesPaths } from 'constants/routesPath';
import ClientActivityTable from './ClientActivityTable';

const ClientActivityCard = () => {
  const { t } = useTranslation();

  return (
    <HomePageCard
      title={t('myActivityTableTitle')}
      viewMoreText={t('viewAll')}
      viewMoreUrl={RoutesPaths.App.Services}>
      <ClientActivityTable />
    </HomePageCard>
  );
};

export default ClientActivityCard;
