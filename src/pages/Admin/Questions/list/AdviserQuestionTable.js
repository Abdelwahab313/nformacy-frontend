import React from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import { RoutesPaths } from 'constants/routesPath';
import styled from 'styled-components';

import { fetchQuestionsOfAdviser } from '../../../../apis/questionsAPI';
import useFetchData from 'hooks/useFetchData';
import QuestionCountDown from 'components/counters/QuestionCountDown';
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
      customBodyRender: (value) => {
        return (
          <Chip
            data-status={value}
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

const Circle = styled.div`
  width: 1.5em;
  height: 1.5em;
  background-color: ${(props) => props.color};
  border-radius: 1em;
`;
const QuestionRemainingTimeAlarm = ({ remainingTime, totalActionHours }) => {
  const remainingHours = getRemainingHoursFromDate(remainingTime);
  const remainingHoursPercent = (remainingHours / totalActionHours) * 100;
  let color;
  if (remainingHoursPercent >= 50) {
    color = 'green';
  } else if (remainingHoursPercent < 50 && remainingHoursPercent >= 25) {
    color = 'yellow';
  } else if (remainingHoursPercent < 25 && remainingHoursPercent >= 10) {
    color = 'orange';
  } else if (remainingHoursPercent < 10 && remainingHoursPercent > 0) {
    color = 'red';
  } else {
    color = '';
  }

  return <Circle className={color} color={color} />;
};

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

const AdviserQuestionTable = ( ) => {
  console.log('=============== hi from adviser list ===========');
  const { fetchedData: questions } = useFetchData(() =>
    fetchQuestionsOfAdviser(),
  );

  console.log('=========the obj of ques', questions);

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
