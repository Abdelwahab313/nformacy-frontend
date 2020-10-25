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
import ByTimeField from './subComponents/ByTimeField';
import { useStyles } from '../../../../styles/Admin/questionTableStyles';

const COLUMN_INDEXES = {
  id: 0,
  referenceNumber: 1,
  title: 2,
  assignmentType: 3,
  field: 4,
  createdAt: 5,
  answersCount: 6,
  state: 7,
  actionNeeded: 8,
  currentActionTime: 9,
  alarm: 10,
  reviewAndEditHours: 11,
  hoursToCloseAnswers: 12,
};
const CONSTANT_HOURS_FOR_ACTION = 12;
const DYNAMIC_STATES = {
  reviewAndEdit: 'review_and_edit',
  answersRating: 'answers_rating',
};

const getTotalActionTime = (rowData) => {
  switch (rowData[COLUMN_INDEXES.state]) {
    case DYNAMIC_STATES.reviewAndEdit:
      return rowData[COLUMN_INDEXES.reviewAndEditHours];
    case DYNAMIC_STATES.answersRating:
      return rowData[COLUMN_INDEXES.hoursToCloseAnswers];
    default:
      return CONSTANT_HOURS_FOR_ACTION;
  }
};

const getColumnsFor = (isAdviser, classes) => {
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
      label: 'Reference',
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
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
              data-status={tableMeta.rowData[COLUMN_INDEXES.state]}
              data-reference={tableMeta.rowData[COLUMN_INDEXES.referenceNumber]}
              className={classes.link}
              to={{
                pathname: RoutesPaths.Admin.QuestionsDetails,
                state: { questionId: tableMeta.rowData[COLUMN_INDEXES.id] },
              }}>
              <TextCroppedWithTooltip text={value} />
            </Link>
          );
        },
      },
    },
    {
      name: 'assignmentType',
      label: 'Type',
      options: {
        ...defaultColumnOption,
        display: !isAdviser,
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
      name: 'field',
      label: 'Fields',
      options: {
        ...defaultColumnOption,
        display: !isAdviser,
        filter: false,
        filterType: 'multiselect',
        customBodyRender: (value) => {
          return value?.map((val, key) => {
            return (
              <div>
                <Chip
                  className={classes.field}
                  label={val.label}
                  key={key.value}
                />
              </div>
            );
          });
        },
      },
    },
    {
      name: 'createdAt',
      label: 'Posted At',
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
          const actionNeeded =
            questionStatusActions[value][isAdviser ? 'adviser' : 'admin'];

          if (!actionNeeded) {
            return '';
          }
          return (
            <Link
              className={classes.link}
              to={{
                pathname: RoutesPaths.Admin.QuestionsDetails,
                state: { questionId: tableMeta.rowData[COLUMN_INDEXES.id] },
              }}>
              <StyledStatusChip
                data-status={value}
                className={'state'}
                data-reference={
                  tableMeta.rowData[COLUMN_INDEXES.referenceNumber]
                }
                label={actionNeeded}
              />
            </Link>
          );
        },
      },
    },
    {
      name: 'currentActionTime',
      options: {
        filter: false,
        sort: true,
        customHeadLabelRender: () => (
          <Grid className={classes.currentActionTimeContainer}>By Time</Grid>
        ),
        customBodyRender: (currentActionTime, tableMeta) => {
          return currentActionTime ? (
            <ByTimeField
              currentActionTime={currentActionTime}
              referenceId={tableMeta.rowData[COLUMN_INDEXES.referenceNumber]}
              questionId={tableMeta.rowData[COLUMN_INDEXES.id]}
            />
          ) : null;
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
              totalActionHours={getTotalActionTime(tableMeta.rowData)}
              className={'alarm'}
              data-reference={tableMeta.rowData[COLUMN_INDEXES.referenceNumber]}
            />
          );
        },
      },
    },
    {
      name: 'hoursToReviewAndEdit',
      label: '',
      options: {
        display: false,
        ...defaultColumnOption,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'hoursToCloseAnswers',
      label: '',
      options: {
        display: false,
        ...defaultColumnOption,
        filter: false,
        sort: false,
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

const QuestionsTable = ({ questions, isAdviser }) => {
  const classes = useStyles();

  const tableOptions = {
    filterType: 'checkbox',
    selectableRows: 'none',
    responsive: 'standard',
    fixedHeader: true,
    download: false,
    print: false,
    rowsPerPage: process.env.REACT_APP_ENV === 'e2e' ? 300 : 10,
    setRowProps: (row) => ({
      'row-reference': row[COLUMN_INDEXES.referenceNumber],
    }),
  };

  return (
    <MUIDataTable
      title={'Questions List'}
      data={questions}
      columns={getColumnsFor(isAdviser, classes)}
      options={tableOptions}
    />
  );
};

export default QuestionsTable;
