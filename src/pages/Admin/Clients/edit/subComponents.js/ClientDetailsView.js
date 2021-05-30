import React from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import MUIDataTable from 'mui-datatables';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { Chip } from '@material-ui/core';
import FieldsChips from 'components/chips/FieldsChips';
import LinkText from 'components/typography/LinkText';
import { getClientDetails } from 'services/navigation';

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const columns = [
    {
      name: 'date',
      label: t('date'),
      options: {
        ...defaultColumnOption,
        display: true,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'userName',
      label: t('userName/id'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'serviceId',
      label: t('serviceId'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'type',
      label: t('type'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
    {
      name: 'consultants',
      label: t('consultants'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'fieldsAssigned',
      label: t('fieldsAssigned'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'subFields',
      label: t('subFields'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'deliverables',
      label: t('deliverables'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'evaluation',
      label: t('evaluation'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'fees',
      label: t('fees'),
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
    industriesOfExperience: client.industriesOfExperience?.map((industry) => (
      <div key={industry.value}>
        <Chip label={industry.label} key={industry.value} />
      </div>
    )),
    fields: <FieldsChips fields={client.fields} />,
    userName:
      <LinkText to={getClientDetails(client.id)}>
        {client.referenceNumber}
      </LinkText>,
  }));
};

const ClientDetailsView = ({ clients }) => {
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
      title={t('clientsList')}
      data={!!clientsRows ? clientsRows : []}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default ClientDetailsView;
