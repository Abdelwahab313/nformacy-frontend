import React from 'react';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';
import CustomTypography from 'components/typography/Typography';
import CorporateActivityTable from './CorporateActivityTable';

const CorporateActivitiesFullTable = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <CustomTypography variant='h5' fontWeight='bold'>
        {t('myActivityTableTitle')}
      </CustomTypography>
      <CorporateActivityTable />
    </Fragment>
  );
};

export default CorporateActivitiesFullTable;
