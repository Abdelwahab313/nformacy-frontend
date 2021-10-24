import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import LinkText from 'components/typography/LinkText';
import ColoredFieldsChips from 'components/chips/ColoredFieldsChips';
import { getClientProfileDetails } from 'services/navigation';

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const columns = [
    {
      name: 'beneficiaryRef',
      label: t('beneficiaryRef'),
      options: {
        ...defaultColumnOption,
        display: true,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'email',
      label: t('email'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'firstName',
      label: t('firstName'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'lastName',
      label: t('lastName'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'fields',
      label: t('fieldsAssigned'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
  ];

  return columns;
};

const parseBeneficiariesTableData = (beneficiaries) => {
  return beneficiaries?.map((beneficiary) => ({
    ...beneficiary,
    beneficiaryRef: (
      <LinkText to={getClientProfileDetails(beneficiary.id)}>
        {beneficiary.referenceNumber}
      </LinkText>
    ),
    fields: <ColoredFieldsChips fields={beneficiary.fields} />,
  }));
};

const ProjectBeneficiariesTable = ({ beneficiaries }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = getColumnsOptions(classes, t);
  const beneficiariesRows = parseBeneficiariesTableData(beneficiaries);
  const tableOptions = {
    filterType: 'checkbox',
    selectableRows: 'none',
    responsive: 'standard',
    fixedHeader: true,
    download: false,
    print: false,
    viewColumns: authManager.isAdmin(),
    rowsPerPage: process.env.REACT_APP_ENV === 'e2e' ? 300 : 10,
    setRowProps: (row) => ({
      'row-reference': row[0],
    }),
  };
  return (
    <MUIDataTable
      title={t('beneficiariesList')}
      data={!!beneficiariesRows ? beneficiariesRows : []}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default ProjectBeneficiariesTable;
