import React from 'react';
import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import { Chip } from '@material-ui/core';
import FieldsChips from 'components/chips/FieldsChips';
import LinkText from 'components/typography/LinkText';
import { getAdminDetails } from 'services/navigation';

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const columns = [
    {
      name: 'id',
      label: t('id'),
      options: {
        ...defaultColumnOption,
        display: true,
        filter: false,
        sort: false,
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
      name: 'createdAt',
      label: t('dateJoined'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'jobTitle',
      label: t('title'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'pointesConsumed',
      label: t('pointesConsumed'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
    {
      name: 'pointsBalance',
      label: t('pointsBalance'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'managePoints',
      label: t('managePoints'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'manageAccount',
      label: t('manageAccount'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
  ];

  return columns;
};

const parseAccountsTableData = (accounts) => {
  return accounts?.map((account) => ({
    ...account,
    industriesOfExperience: account.industriesOfExperience?.map((industry) => (
      <div key={industry.value}>
        <Chip
          style={{ margin: 2 }}
          label={industry.label}
          key={industry.value}
        />
      </div>
    )),
    fields: <FieldsChips fields={account.fields} />,
    accountRef: (
      <LinkText to={getAdminDetails(account.id)}>
        {account.referenceNumber}
      </LinkText>
    ),

  }));
};


const AccountsTable = ({ accounts }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = getColumnsOptions(classes, t);
  const accountsRows = parseAccountsTableData(accounts);
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
      title={t('accountsList')}
      data={!!accountsRows ? accountsRows : []}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default AccountsTable;
