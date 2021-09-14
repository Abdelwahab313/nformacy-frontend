import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
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
      name: 'requestType',
      label: t('activityType'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'serviceRef',
      label: t('refNo'),
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
      name: 'createdAt',
      label: t('requestDate'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'language',
      label: t('languageField'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
        display: false,
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
        filter: false,
        sort: false,
      },
    },
    {
      name: 'actionTime',
      options: {
        filter: false,
        sort: true,
        customHeadLabelRender: () => (
          <Grid className={classes.currentActionTimeContainer}>Time</Grid>
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
    rowsPerPage: process.env.REACT_APP_ENV === 'e2e' ? 300 : 10,
    setRowProps: (row) => ({
      'row-reference': row[0],
    }),
  };
  return (
    <MUIDataTable
      title={t('myActivityTableTitle')}
      data={servicesRows}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default ServicesTable;
