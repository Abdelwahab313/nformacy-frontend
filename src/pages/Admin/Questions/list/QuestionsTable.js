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
import FieldsChips from 'components/chips/FieldsChips';
import LinkText from 'components/typography/LinkText';

export const COLUMN_NAMES = {
  id: 'id',
  referenceNumber: 'referenceNumber',
  title: 'title',
  assignmentType: 'assignmentType',
  field: 'field',
  createdAt: 'createdAt',
  answersCount: 'answersCount',
  state: 'state',
  actionNeeded: 'state',
  currentActionTime: 'currentActionTime',
  alarm: 'currentActionTime',
  reviewAndEditHours: 'hoursToReviewAndEdit',
  hoursToCloseAnswers: 'hoursToCloseAnswers',
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
            <LinkText
              data-status={
                tableMeta.rowData[
                  getIndexForColumn(COLUMN_NAMES.state, columns)
                ]
              }
              data-reference={
                tableMeta.rowData[
                  getIndexForColumn(COLUMN_NAMES.referenceNumber, columns)
                ]
              }
              className={'title'}
              to={{
                pathname: RoutesPaths.Admin.QuestionsDetails,
                state: {
                  questionId:
                    tableMeta.rowData[
                      getIndexForColumn(COLUMN_NAMES.id, columns)
                    ],
                },
              }}>
              <TextCroppedWithTooltip text={value} />
            </LinkText>
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
      name: 'fields',
      label: 'Fields',
      options: {
        ...defaultColumnOption,
        display: !isAdviser,
        filter: false,
        filterType: 'multiselect',
        customBodyRender: (fields) => <FieldsChips fields={fields} />,
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
                state: {
                  questionId:
                    tableMeta.rowData[
                      getIndexForColumn(COLUMN_NAMES.id, columns)
                    ],
                },
              }}>
              <StyledStatusChip
                data-status={value}
                className={'state'}
                data-reference={
                  tableMeta.rowData[
                    getIndexForColumn(COLUMN_NAMES.referenceNumber, columns)
                  ]
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
              referenceId={
                tableMeta.rowData[
                  getIndexForColumn(COLUMN_NAMES.referenceNumber, columns)
                ]
              }
              questionId={
                tableMeta.rowData[getIndexForColumn(COLUMN_NAMES.id, columns)]
              }
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
              totalActionHours={getTotalActionTime(tableMeta.rowData, columns)}
              className={'alarm'}
              data-reference={
                tableMeta.rowData[
                  getIndexForColumn(COLUMN_NAMES.referenceNumber, columns)
                ]
              }
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
  const columns = getColumnsFor(isAdviser, classes);

  const tableOptions = {
    filterType: 'checkbox',
    selectableRows: 'none',
    responsive: 'standard',
    fixedHeader: true,
    download: false,
    print: false,
    rowsPerPage: process.env.REACT_APP_ENV === 'e2e' ? 300 : 10,
    setRowProps: (row) => ({
      'row-reference':
        row[getIndexForColumn(COLUMN_NAMES.referenceNumber, columns)],
    }),
  };
  return (
    <MUIDataTable
      title={'Questions List'}
      data={questions}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default QuestionsTable;
