import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import MUIDataTable from 'mui-datatables';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { Chip } from '@material-ui/core';
import FieldsChips from 'components/chips/FieldsChips';
import LinkText from 'components/typography/LinkText';
import { getClientProfileDetails } from 'services/navigation';
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
      name: 'jobTitle',
      label: t('role'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
    {
      name: 'createdAt',
      label: t('dateAdded'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'questions',
      label: t('questions'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'calls',
      label: t('calls'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'assignmentsDays',
      label: t('assignmentsDays'),
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
    industriesOfExperience: client.industriesOfExperience?.map((industry) => (
      <div key={industry.value}>
        <Chip label={industry.label} key={industry.value} />
      </div>
    )),
    fields: <FieldsChips fields={client.fields} />,
    id: (
      <LinkText to={getClientProfileDetails(client.id)}>{client.id}</LinkText>
    ),
    createdAt: (
      <Fragment>
        {formattedDateMonthAndDay(new Date(client.createdAt))}
      </Fragment>
    ),
  }));
};

const ClientDetails = ({ clients }) => {
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
      title={t('beneficiariesDetails')}
      data={!!clientsRows ? clientsRows : []}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default ClientDetails;
