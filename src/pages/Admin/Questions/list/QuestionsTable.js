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
        filter: false,
        sort: true,
      },
    },
    {
      name: 'title',
      label: 'Title',
      options: {
        filter: true,
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
        display: !isAdviser,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'field',
      label: 'Fields',
      options: {
        display: !isAdviser,
        filter: false,
        filterType: 'multiselect',
        customBodyRender: (value) => {
          return value?.map((val, key) => {
            return (
              <Chip style={{ margin: 4 }} label={val.label} key={key.value} />
            );
          });
        },
      },
    },
    {
      name: 'state',
      label: 'Status/Action',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
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
                label={value.split('_').join(' ')}
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
        customHeadLabelRender: ()=>(<Grid><AlarmIcon fontSize={'small'} color={'primary'} style={{marginRight: '10px'}}/>By Time</Grid>),
        customBodyRender: (currentActionTime, tableMeta) => {
          return (
            <QuestionCountDown
              showIcon={false}
              className={'currentActionTime'}
              data-reference={tableMeta.rowData[1]}
              date={currentActionTime}
            />
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
        customBodyRender: (currentActionTime, tableMeta) => {
          console.log('=====table meta ======', tableMeta);
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
        filter: false,
        sort: false,
      },
    },
    // {
    //   name: 'Options',
    //   options: {
    //     filter: false,
    //     sort: false,
    //     empty: true,
    //     customBodyRender: (value, tableMeta) => {
    //       return <ActionRow itemId={tableMeta.rowData[0]}  status={tableMeta.rowData[6]}/>;
    //     },
    //   },
    // },
  ];

  return columns;
};

const StyledStatusChip = withStyles({
  root: {
    margin: 3,
    backgroundColor: '#cec8ef',
  },
  label: {
    fontSize: '1rem',
  },
})(Chip);

const TextCroppedWithTooltip = ({ text }) => {
  return (
    <Tooltip title={<Typography variant={'body2'}>{text}</Typography>} arrow>
      <Typography
        noWrap
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
        {text}
      </Typography>
    </Tooltip>
  );
};

// const ActionRow = ({ itemId, status }) => {
//   return (
//     <IconButton
//       aria-label='edit'
//       id='editSummary'
//       data-status={status}
//       component={Link}
//       to={{
//         pathname: RoutesPaths.Admin.QuestionsDetails,
//         state: { questionId: itemId },
//       }}>
//       <EditIcon color={'primary'} />
//     </IconButton>
//   );
// };

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
