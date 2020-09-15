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
          <Chip
            data-status={value}
            data-reference={tableMeta.rowData[1]}
            style={({ margin: 3 }, { backgroundColor: '#cec8ef' })}
            label={value.split('_').join(' ')}
          />
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
      customBodyRender: (value) => {
        return <QuestionCountDown date={value} />;
      },
    },
  },
  {
    name: 'currentActionTime',
    label: 'Alarm',
    options: {
      filter: true,
      sort: false,
      customBodyRender: (value) => {
        return (
          <QuestionRemainingTimeAlarm
            remainingTime={value}
            totalActionHours={12}
          />
        );
      },
    },
  },
];

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
