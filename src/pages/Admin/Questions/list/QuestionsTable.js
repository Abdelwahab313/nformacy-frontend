import React from 'react';

import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import AlarmIcon from '@material-ui/icons/Alarm';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import { RoutesPaths } from 'constants/routesPath';
import QuestionCountDown from 'components/counters/QuestionCountDown';
import QuestionRemainingTimeAlarm from 'components/feedback/QuestionRemainingTimeAlarm';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import { questionStatusActions } from 'constants/questionStatus';
import { questionTypesOfAssignment } from 'constants/dropDownOptions';

const defaultColumnOption = {
  customHeadLabelRender: ({label}) => (
    <Grid style={{ fontWeight: 'bold', whiteSpace:'nowrap'}}>
      {label}
    </Grid>
  ),
};
const getColumnsFor = (isAdviser) => {
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
              data-status={tableMeta.rowData[6]}
              data-reference={tableMeta.rowData[1]}
              style={{ textDecoration: 'none' }}
              to={{
                pathname: RoutesPaths.Admin.QuestionsDetails,
                state: { questionId: tableMeta.rowData[0] },
              }}>
              <TextCroppedWithTooltip text={value} />
            </Link>
          );
        },
      },
    },
    {
      name: 'assignmentType',
      label: 'Assignment Type',
      options: {
        ...defaultColumnOption,
        display: !isAdviser,
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          const assignmentLabel = questionTypesOfAssignment.filter(
            (assignmentOption) => assignmentOption.value === value,
          )[0].label;
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
              <Chip style={{ margin: 2 }} label={val.label} key={key.value} />
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
          return formattedDateTimeNoSeconds(new Date(value));
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
              style={{ textDecoration: 'none' }}
              to={{
                pathname: RoutesPaths.Admin.QuestionsDetails,
                state: { questionId: tableMeta.rowData[0] },
              }}>
              <StyledStatusChip
                data-status={value}
                className={'state'}
                data-reference={tableMeta.rowData[1]}
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
          <Grid style={{ fontWeight: 'bold', whiteSpace:'nowrap' }}>
            <AlarmIcon
              fontSize={'small'}
              color={'primary'}
              style={{ marginRight: '0.1rem', }}
            />
            By Time
          </Grid>
        ),
        customBodyRender: (currentActionTime, tableMeta) => {
          return currentActionTime ? (
            <QuestionCountDown
              showIcon={false}
              className={'currentActionTime'}
              data-reference={tableMeta.rowData[1]}
              date={currentActionTime}
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
              totalActionHours={
                tableMeta.rowData[3] === 'review_and_edit'
                  ? tableMeta.rowData[6]
                  : 12
              }
              className={'alarm'}
              data-reference={tableMeta.rowData[1]}
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

const TextCroppedWithTooltip = ({ text }) => {
  return (
    <Tooltip title={<Typography variant={'caption'}>{text}</Typography>} arrow>
      <Typography
        noWrap
        variant={'body2'}
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
        {text}
      </Typography>
    </Tooltip>
  );
};

const QuestionsTable = ({ questions, isAdviser }) => {
  const tableOptions = {
    filterType: 'checkbox',
    selectableRows: 'none',
    responsive: 'standard',
    fixedHeader: true,
    download: false,
    print: false,
  };

  return (
    <MUIDataTable
      title={'Questions List'}
      data={questions}
      columns={getColumnsFor(isAdviser)}
      options={tableOptions}
    />
  );
};

export default QuestionsTable;
