import React from 'react';
import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import LinkText from 'components/typography/LinkText';
import { getClientDetailsView, getSubAccounts } from 'services/navigation';
import { getUserCountryLabel } from 'core/user';
import { renderIndustriesOfExperience } from 'core/industriesOfExp';
import { formattedDateMonthAndDay } from 'services/dateTimeParser';

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };



  const generateLinkText = (clientId, value, cb) => {
    return <LinkText to={cb(clientId || value)}>
      {value}
    </LinkText>;
  };

  const getClientId = (tableMeta) => {
    return tableMeta.rowData[0];
  };


  const columns = [
    {
      name: 'clientId',
      options: {
        ...defaultColumnOption,
        display: false
      }
    },
    {
      name: 'id',
      label: t('id'),
      options: {
        ...defaultColumnOption,
        display: true,
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const clientId = getClientId(tableMeta);
          return generateLinkText(clientId, value, getClientDetailsView);
        },
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
      name: 'organizationName',
      label: t('organization'),
      options: {
        ...defaultColumnOption,
        filter: false,
      },
    },
    {
      name: 'createdAt',
      label: t('registrationDate'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'country',
      label: t('location'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
    {
      name: 'industriesOfExperience',
      label: t('industry'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'accountsCount',
      label: t('numberOfAccounts'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const clientId = getClientId(tableMeta);
          return generateLinkText(clientId, value, getSubAccounts);
        },
      },
    },
    {
      name: 'packageType',
      label: t('packageType'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'state',
      label: t('state'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
  ];

  return columns;
};

const parseClientsTableData = (clients) => {
  return clients?.map((client) => ({
    ...client,
    id: client.referenceNumber,
    clientId: client.id,
    industriesOfExperience: renderIndustriesOfExperience(client.industriesOfExperience),
    country: getUserCountryLabel(client.country),
    createdAt: formattedDateMonthAndDay(new Date(client.createdAt)),
    organizationName: !client.organizationName
      ? 'No Organization'
      : client.organizationName,
    accountsCount: client.accountsCount
  }));
};

const ClientsTable = ({ clients }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = getColumnsOptions(classes, t);
  const clientsRows = parseClientsTableData(clients);
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
      data={!!clientsRows ? clientsRows : []}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default ClientsTable;
