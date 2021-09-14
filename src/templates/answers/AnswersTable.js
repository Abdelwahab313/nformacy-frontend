import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';

import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';

import parseActivitiesToTableRow from 'templates/activities/parseActivitiesToTable';

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const columns = [
    // data for refernce
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
      name: 'questionId',
      label: t('serviceQuestionId'),
      options: {
        ...defaultColumnOption,
        filter: false,
        display: false,
      },
    },
    {
      name: 'questionState',
      label: t('Question State'),
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    // display data
    {
      name: 'activityId',
      label: t('serviceReferenceNumber'),
      options: {
        ...defaultColumnOption,
        filter: false,
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
      name: 'title',
      label: t('title'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'date',
      label: t('postDate'),
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
        filter: false,
        filterType: 'multiselect',
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
      name: 'time',
      options: {
        filter: false,
        sort: true,
        customHeadLabelRender: () => (
          <Grid className={classes.currentActionTimeContainer}>By Time</Grid>
        ),
      },
    },
    {
      name: 'timeAlarm',
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

const AnswersTable = ({ activities }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const columns = getColumnsOptions(classes, t);
  const activitiesTableView = parseActivitiesToTableRow(activities, t);

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
      title={t('answersList')}
      data={activitiesTableView}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default AnswersTable;
