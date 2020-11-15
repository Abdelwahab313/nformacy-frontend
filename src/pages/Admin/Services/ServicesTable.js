import React from 'react';

import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import { RoutesPaths } from 'constants/routesPath';
import QuestionRemainingTimeAlarm from 'components/feedback/QuestionRemainingTimeAlarm';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import { questionStatusActions } from 'constants/questionStatus';
import { questionTypesOfAssignment } from 'constants/dropDownOptions';
import { useStyles } from 'styles/Admin/questionTableStyles';
import QuestionFields from '../Questions/list/subComponents/QuestionFields';

export const COLUMN_NAMES = {
  requestId: 'id',
  clientId: 'userId',
  type: 'type',
  Date: 'createdAt',
  title: 'title',
  field: 'field',
  language: 'language',
  questionId: 'questionId',
  state: 'state',
  answersCount: 'answersCount',
  actionNeeded: 'state',
  currentActionTime: 'currentActionTime',
  alarm: 'currentActionTime',
};

export const HOURS_FOR_ACTION = 12;
const DYNAMIC_STATES = {
  reviewAndEdit: 'review_and_edit',
  answersRating: 'answers_rating',
};

export const getTotalActionTime = (rowData, columns) => {
  const state = rowData[getIndexForColumn(COLUMN_NAMES.state, columns)];
  switch (state) {
    case DYNAMIC_STATES.reviewAndEdit:
      const reviewAndEditHours =
        rowData[getIndexForColumn(COLUMN_NAMES.reviewAndEditHours, columns)];
      return reviewAndEditHours;
    case DYNAMIC_STATES.answersRating:
      const hoursToCloseAnswers =
        rowData[getIndexForColumn(COLUMN_NAMES.hoursToCloseAnswers, columns)];
      return hoursToCloseAnswers;
    default:
      return HOURS_FOR_ACTION;
  }
};

export const getIndexForColumn = (columnName, columns) => {
  for (const [index, column] of columns.entries()) {
    if (column.name === columnName) {
      return index;
    }
  }
  throw new TypeError(`Column: ${columnName} does not exist`);
};

const getColumnsFor = (classes) => {
  const TextCroppedWithTooltip = ({ text }) => {
    return (
      <Tooltip
        title={<Typography variant={'caption'}>{text}</Typography>}
        arrow>
        <Typography noWrap variant={'body2'} className={classes.tooltip}>
          {text}
        </Typography>
      </Tooltip>
    );
  };

  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const columns = [
    {
      name: 'id',
      label: 'ID',
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'referenceNumber',
      label: 'Request ID',
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <Link
              data-status={
                tableMeta.rowData[0]
              }
              data-reference={
                tableMeta.rowData[0]
              }
              className={classes.link}
              to={{
                pathname: RoutesPaths.Admin.ServiceDetails,
                state: {
                  serviceId:
                    tableMeta.rowData[0],
                },
              }}>
              <TextCroppedWithTooltip text={value} />
            </Link>
          );
        },
      },
    },
    {
      name: 'userId',
      label: 'Client ID',
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'assignmentType',
      label: 'Type',
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          const assignmentLabel = questionTypesOfAssignment.filter(
            (assignmentOption) => assignmentOption.value === value,
          )[0]?.label;
          return assignmentLabel;
        },
      },
    },
    {
      name: 'createdAt',
      label: 'Date',
      options: {
        ...defaultColumnOption,
        filter: false,
        customBodyRender: (value) => {
          return (
            <Typography
              className={classes.nowrapText}
              variant='body2'
              gutterBottom>
              {formattedDateTimeNoSeconds(new Date(value))}
            </Typography>
          );
        },
      },
    },
    {
      name: 'title',
      label: 'Title',
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <Link
              data-status={tableMeta.rowData[10]}
              data-reference={tableMeta.rowData[0]}
              className={classes.link}
              to={{
                pathname: RoutesPaths.Admin.QuestionsDetails,
                state: {
                  questionId: tableMeta.rowData[0],
                },
              }}>
              <TextCroppedWithTooltip text={value} />
            </Link>
          );
        },
      },
    },
    {
      name: 'fields',
      label: 'Fields',
      options: {
        ...defaultColumnOption,
        filter: false,
        filterType: 'multiselect',
        customBodyRender: (fields) => <QuestionFields fields={fields}/>,
      },
    },
    {
      name: 'language',
      label: 'Language',
      options: {
        ...defaultColumnOption,
        filter: false,
        customBodyRender: (value) => {
          return (
            <Typography
              className={classes.answersCount}
              variant='body1'
              gutterBottom>
              {value}
            </Typography>
          );
        },
      },
    },
    {
      name: 'questionId',
      label: 'Question Roaster Id',
      options: {
        ...defaultColumnOption,
        filter: false,
        customBodyRender: (value) => {
          return (
            <Typography
              className={classes.answersCount}
              variant='body1'
              gutterBottom>
              {value}
            </Typography>
          );
        },
      },
    },
    {
      name: 'answersCount',
      label: 'Answers',
      options: {
        ...defaultColumnOption,
        filter: false,
        customBodyRender: (value) => {
          return (
            <Typography
              className={classes.answersCount}
              variant='body1'
              gutterBottom>
              {value}
            </Typography>
          );
        },
      },
    },
    {
      name: 'state',
      label: 'Status',
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return questionStatusActions[value].displayString;
        },
      },
    },
    {
      name: 'state',
      label: 'Action Needed',
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const actionNeeded = questionStatusActions[value].admin;
          if (!actionNeeded) {
            return '';
          }
          return (
            <Link
              className={classes.link}
              to={{
                pathname: RoutesPaths.Admin.QuestionsDetails,
                state: {
                  questionId: tableMeta.rowData[0],
                },
              }}>
              <StyledStatusChip
                data-status={value}
                className={'state'}
                data-reference={tableMeta.rowData[0]}
                label={actionNeeded}
              />
            </Link>
          );
        },
      },
    },
    {
      name: 'currentActionTime',
      label: 'Alarm',
      options: {
        filter: false,
        sort: true,
        ...defaultColumnOption,
        customBodyRender: (currentActionTime, tableMeta) => {
          return (
            <QuestionRemainingTimeAlarm
              remainingTime={currentActionTime}
              totalActionHours={getTotalActionTime(tableMeta.rowData, columns)}
              className={'alarm'}
              data-reference={tableMeta.rowData[0]}
            />
          );
        },
      },
    },
  ];

  return columns;
};

const StyledStatusChip = withStyles({
  root: {
    margin: 1,
    backgroundColor: '#cec8ef',
  },
  label: {
    fontSize: '0.8rem',
  },
})(Chip);

const ServicesTable = ({ services }) => {
  const classes = useStyles();
  const columns = getColumnsFor(classes);

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
      title={'Service Requests List'}
      data={services}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default ServicesTable;
