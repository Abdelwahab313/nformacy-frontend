import React from 'react';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';
import CustomTypography from 'components/typography/Typography';
import ConsultantActivityTable from 'pages/App/Home/subComponents/ConsultantActivityTable';

const FreelancerActivitiesFullTable = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <CustomTypography variant='h5' fontWeight='bold'>
        {t('myActivityTableTitle')}
      </CustomTypography>
      <ConsultantActivityTable />
    </Fragment>
  );
};

export default FreelancerActivitiesFullTable;
