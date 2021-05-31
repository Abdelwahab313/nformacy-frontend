import React, { useState, Fragment } from 'react';
import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import { Chip } from '@material-ui/core';
import LinkText from 'components/typography/LinkText';
import { getClientDetailsView } from 'services/navigation';
import countryList from 'react-select-country-list';
import { formattedDateMonthAndDay } from 'services/dateTimeParser';

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
      name: 'numberOfAccounts',
      label: t('numberOfAccounts'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
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

const parseClientsTableData = (clients, countries) => {
  return clients?.map((client) => ({
    ...client,
    industriesOfExperience: client.industriesOfExperience?.map((industry) => (
      <div key={industry.value}>
        <Chip label={industry.label} key={industry.value} />
      </div>
    )),
    id:
      <LinkText to={getClientDetailsView(client.id)}>
        {client.referenceNumber}
      </LinkText>,
    country:
      <Fragment>
        {client.country &&
          countries?.find(
            (country) => country.value === client.country,
          ).label}
      </Fragment>,
    createdAt:
      <Fragment>
        {formattedDateMonthAndDay(
          new Date(client.createdAt),
        )}
      </Fragment>
  }));
};


const ClientsTable = ({ clients }) => {
  const [countries] = useState(countryList().getData());
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = getColumnsOptions(classes, t);
  const clientsRows = parseClientsTableData(clients, countries);
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
      title={t('clientsList')}
      data={!!clientsRows ? clientsRows : []}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default ClientsTable;
