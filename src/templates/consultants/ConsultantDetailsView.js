import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import MUIDataTable from 'mui-datatables';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { Chip } from '@material-ui/core';
import FieldsChips from 'components/chips/FieldsChips';
import LinkText from 'components/typography/LinkText';
import { getClientDetails, getQuestionDetails } from 'services/navigation';
import { formattedDateMonthAndDay } from 'services/dateTimeParser';

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const columns = [
    {
      name: 'createdAt',
      label: t('date'),
      options: {
        ...defaultColumnOption,
        display: true,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'assignmentId',
      label: t('assignmentId'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'assignmentType',
      label: t('type'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'client',
      label: t('client'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
    {
      name: 'fields',
      label: t('fieldsAssigned'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'industry',
      label: t('industry'),
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

const parseActivitiesTableData = (activities) => {
  return activities?.map((activity) => ({
    ...activity,
    industry: (
      <div key={activity?.industry?.value}>
        <Chip label={activity?.industry?.label} key={activity?.industry?.value} />
      </div>
    ),
    fields: <FieldsChips fields={activity?.question?.fields} />,
    assignmentId: (<LinkText to={getQuestionDetails(activity.questionId)}>
      {activity.questionRef}
    </LinkText>),
    client:
      <LinkText to={getClientDetails(activity.clientId)}>
        {activity.clientId}
      </LinkText>,
    createdAt:
      <Fragment>
        {formattedDateMonthAndDay(
          new Date(activity.createdAt),
        )}
      </Fragment>
  }));
};

const ConsultantDetailsView = ({ activities }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = getColumnsOptions(classes, t);
  const clientsRows = parseActivitiesTableData(activities);
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
      title={t('servicesList')}
      data={!!clientsRows ? clientsRows : []}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default ConsultantDetailsView;
