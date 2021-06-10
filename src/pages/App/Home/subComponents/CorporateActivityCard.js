import React from 'react';
import { useTranslation } from 'react-i18next';
import HomePageCard from './HomePageCard';
import { RoutesPaths } from 'constants/routesPath';
import CorporateActivityTable from './CorporateActivityTable';

const CorporateActivityCard = () => {
  const { t } = useTranslation();

  return (
    <HomePageCard
      title={t('myActivityTableTitle')}
      viewMoreText={t('viewAll')}
      viewMoreUrl={RoutesPaths.App.CorporateActivitiesList}>
      <CorporateActivityTable />
    </HomePageCard>
  );
};

export default CorporateActivityCard;
