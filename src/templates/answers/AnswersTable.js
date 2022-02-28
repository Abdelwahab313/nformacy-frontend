import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';

import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';

import parseActivitiesToTableRow from 'templates/activities/parseActivitiesToTable';
import TextCroppedWithTooltip from 'components/typography/TextCroppedWithTooltip';
import CustomTypography from 'components/typography/Typography';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import ActivityRefLink from 'templates/services/ActivityRefLink';
import FreelancerAnswerTime from './FreelancerAnswerTime';

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const getServiceId = (tableMeta) => {
    return tableMeta.rowData[0];
  };

  const getQuestionId = (tableMeta) => {
    return tableMeta.rowData[1];
  };

  const getActivityType = (tableMeta) => {
    return tableMeta.rowData[2];
  };

  const columns = [
    // data for refernce
    {
      name: 'serviceId',
      options: {
        ...defaultColumnOption,
        filter: false,
        display: false,
      },
    },
    {
      name: 'questionId',
      options: {
        ...defaultColumnOption,
        filter: false,
        display: false,
      },
    },
    {
      name: 'activityType',
      options: {
        ...defaultColumnOption,
        filter: false,
        display: false,
      },
    },

    // display data
    {
      name: 'activityRef',
      label: t('serviceReferenceNumber'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
        customBodyRender: (serviceRef, tableMeta) => {
          return (
            <ActivityRefLink
              activityType={getActivityType(tableMeta)}
              serviceId={getServiceId(tableMeta)}
              questionId={getQuestionId(tableMeta)}
              referenceId={serviceRef}
            />
          );
        },
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
        customBodyRender: (title) => {
          return <TextCroppedWithTooltip text={title} maxChar={15} />;
        },
      },
    },
    {
      name: 'date',
      label: t('postDate'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
        customBodyRender: (createdAt) => {
          return (
            <CustomTypography variant='body2' gutterBottom>
              {formattedDateTimeNoSeconds(createdAt)}
            </CustomTypography>
          );
        },
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
          <Grid className={classes.currentActionTimeContainer}>{t('byTime')}</Grid>
        ),
        customBodyRender: (actionTime) => {
          return <FreelancerAnswerTime currentActionTime={actionTime} />;
        },
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
