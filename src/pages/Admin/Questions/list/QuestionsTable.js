import React from 'react';

import MUIDataTable from 'mui-datatables';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { RoutesPaths } from 'constants/routesPath';
import QuestionRemainingTimeAlarm from 'components/feedback/QuestionRemainingTimeAlarm';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import { questionStatusActions } from 'constants/questionStatus';
import { questionTypesOfAssignment } from 'constants/dropDownOptions';
import ByTimeField from './subComponents/ByTimeField';
import { useStyles } from '../../../../styles/Admin/questionTableStyles';
import FieldsChips from 'components/chips/FieldsChips';
import LinkText from 'components/typography/LinkText';
import TextCroppedWithTooltip from 'components/typography/TextCroppedWithTooltip';
import QuestionActionLink from 'templates/questions/QuestionActionLink';
import QuestionManager from 'core/questionManager';

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

const getQuestionValue = (columnName, rowData, columns) => {
  return rowData[getIndexForColumn(columnName, columns)];
};

export const getIndexForColumn = (columnName, columns) => {
  for (const [index, column] of columns.entries()) {
    if (column.name === columnName) {
      return index;
    }
  }
  throw new TypeError(`Column: ${columnName} does not exist`);
};

export const getTotalActionTime = (rowData, columns) => {
  const state = getQuestionValue(COLUMN_NAMES.state, rowData, columns);
  const reviewAndEditHours = getQuestionValue(
    COLUMN_NAMES.reviewAndEditHours,
    rowData,
    columns,
  );
  const hoursToCloseAnswers = getQuestionValue(
    COLUMN_NAMES.hoursToCloseAnswers,
    rowData,
    columns,
  );

  const totalActionTime = QuestionManager.getTotalActionTime(
    state,
    reviewAndEditHours,
    hoursToCloseAnswers,
  );
  return totalActionTime;
};

const getColumnsFor = (isAdviser, classes) => {
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
      label: 'Question Id',
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
              data-status={getQuestionValue(
                COLUMN_NAMES.state,
                tableMeta.rowData,
                columns,
              )}
              data-reference={getQuestionValue(
                COLUMN_NAMES.referenceNumber,
                tableMeta.rowData,
                columns,
              )}
              className={'title'}
              to={{
                pathname: RoutesPaths.Admin.QuestionsDetails,
                state: {
                  questionId: getQuestionValue(
                    COLUMN_NAMES.id,
                    tableMeta.rowData,
                    columns,
                  ),
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
          return questionStatusActions[value].status.displayString;
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
          return (
            <QuestionActionLink
              state={value}
              id={getQuestionValue(COLUMN_NAMES.id, tableMeta.rowData, columns)}
              answersCount={getQuestionValue(
                COLUMN_NAMES.answersCount,
                tableMeta.rowData,
                columns,
              )}
              referenceNumber={getQuestionValue(
                COLUMN_NAMES.referenceNumber,
                tableMeta.rowData,
                columns,
              )}
            />
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
              referenceId={getQuestionValue(
                COLUMN_NAMES.referenceNumber,
                tableMeta.rowData,
                columns,
              )}
              questionId={getQuestionValue(
                COLUMN_NAMES.id,
                tableMeta.rowData,
                columns,
              )}
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
              data-reference={getQuestionValue(
                COLUMN_NAMES.referenceNumber,
                tableMeta.rowData,
                columns,
              )}
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
      'row-reference': getQuestionValue(
        COLUMN_NAMES.referenceNumber,
        row,
        columns,
      ),
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
