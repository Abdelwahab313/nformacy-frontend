import React from 'react';
import { useTranslation } from 'react-i18next';
import HomePageCard from './HomePageCard';
import { RoutesPaths } from 'constants/routesPath';
import ConsultantActivityTable from './ConsultantActivityTable';

const ConsultantActivityCard = () => {
  const { t } = useTranslation();

  return (
    <HomePageCard
      title={t('myActivityTableTitle')}
      viewMoreText={t('viewAll')}
      viewMoreUrl={RoutesPaths.App.ConsultantActivitiesList}>
      <ConsultantActivityTable />
    </HomePageCard>
  );
};

export default ConsultantActivityCard;
