import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import parseServicesToTableRows from './parseServicesToTableRows';

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
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'serviceRef',
      label: t('serviceReferenceNumber'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'clientId',
      label: t('clientId'),
      options: {
        ...defaultColumnOption,
        filter: false,
        display: authManager.isAdmin(),
        sort: true,
      },
    },
    {
      name: 'requestType',
      label: t('assignmentType'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'createdAt',
      label: t('postDate'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'title',
      label: t('title'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'fields',
      label: t('fields'),
      options: {
        ...defaultColumnOption,
        filter: true,
        filterType: 'multiselect',
      },
    },
    {
      name: 'language',
      label: t('languageField'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'answersCount',
      label: t('answersCount'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
        display: authManager.isAdmin(),
      },
    },
    {
      name: 'questionRef',
      label: t('questionRef'),
      options: {
        ...defaultColumnOption,
        filter: false,
        display: authManager.isAdmin(),
      },
    },
    {
      name: 'status',
      label: t('state'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'action',
      label: t('actionNeeded'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: false,
      },
    },
    {
      name: 'actionTime',
      options: {
        filter: false,
        sort: true,
        customHeadLabelRender: () => (
          <Grid className={classes.currentActionTimeContainer}>By Time</Grid>
        ),
      },
    },
    {
      name: 'alarm',
      label: t('alarm'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
  ];

  return columns;
};

const ServicesTable = ({ services }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = getColumnsOptions(classes, t);
  const servicesRows = parseServicesToTableRows(services, t);

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
      title={t('serviceRequestList')}
      data={servicesRows}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default ServicesTable;
