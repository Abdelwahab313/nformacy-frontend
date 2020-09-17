import React from 'react';
import MUIDataTable from 'mui-datatables';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import { RoutesPaths } from 'constants/routesPath';
import { fetchQuestionsOfAdviser } from '../../../../apis/questionsAPI';
import useFetchData from 'hooks/useFetchData';
import QuestionCountDown from 'components/counters/QuestionCountDown';
import QuestionRemainingTimeAlarm from 'components/feedback/QuestionRemainingTimeAlarm';
import { getRemainingHoursFromDate } from 'services/dateTimeParser';
import { withStyles } from '@material-ui/core/styles';

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
            data-link={tableMeta.rowData[1]}
            style={{ textDecoration: 'none'}}
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
    name: 'state',
    label: 'Action Needed',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => {
        return (
          <Link
            style={{ textDecoration: 'none'}}
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
    label: 'By Time',
    options: {
      filter: true,
      sort: false,
      customBodyRender: (currentActionTime, tableMeta) => {
        return <QuestionCountDown
        className={'currentActionTime'} 
        data-reference={tableMeta.rowData[1]}
        date={currentActionTime} />;
      },
    },
  },
  {
    name: 'currentActionTime',
    label: 'Alarm',
    options: {
      filter: true,
      sort: false,
      customBodyRender: (currentActionTime, tableMeta) => {
        console.log('=====table meta ======',tableMeta);
        return (
          <QuestionRemainingTimeAlarm
            remainingTime={currentActionTime}
            totalActionHours={tableMeta.rowData[3] === 'review_and_edit' ? tableMeta.rowData[6] : 12 }
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
];

const StyledStatusChip = withStyles({
  root: {
   margin: 3, 
   backgroundColor: '#cec8ef'
  },
  label: {
    fontSize: '1rem',  },
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

const AdviserQuestionTable = () => {
  console.log('=============== hi from adviser list ===========');
  const { fetchedData: fetchedQuestions } = useFetchData(() =>
    fetchQuestionsOfAdviser(),
  );

  const questions = fetchedQuestions.filter(
    (question) => getRemainingHoursFromDate(question.currentActionTime) > 0,
  );


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
      title={'Adviser Questions List'}
      data={questions}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default AdviserQuestionTable;
