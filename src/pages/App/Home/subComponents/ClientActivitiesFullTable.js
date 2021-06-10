import React from 'react';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';
import CustomTypography from 'components/typography/Typography';
import ClientActivityTable from './ClientActivityTable';

const ClientActivitiesFullTable = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <CustomTypography variant='h5' fontWeight='bold'>
        {t('myActivityTableTitle')}
      </CustomTypography>
      <ClientActivityTable />
    </Fragment>
  );
};

export default ClientActivitiesFullTable;
