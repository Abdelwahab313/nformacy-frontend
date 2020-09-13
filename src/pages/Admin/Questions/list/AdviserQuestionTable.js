import React from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import { RoutesPaths } from 'constants/routesPath';

import { fetchQuestionsOfAdviser } from '../../../../apis/questionsAPI';
import useFetchData from 'hooks/useFetchData';

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
            style={({ margin: 3 }, { backgroundColor: '#cec8ef' })}
            label={value.split('_').join(' ')}
          />
        );
      },
      // customBodyRender: (value) => value.split('_').join(' '),
    },
  },
  {
    name: 'hoursToCloseAnswers',
    label: 'By Time',
    options: {
      filter: true,
      sort: false,
      customBodyRender: (value) => {
        return value;
      },
    },
  },
  {
    name: 'hoursToCloseAnswers',
    label: 'Alarm',
    options: {
      filter: true,
      sort: false,
      customBodyRender: (value) => {
        return value;
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

const ActionRow = ({ itemId }) => {
  return (
    <IconButton
      aria-label='edit'
      id='editSummary'
      component={Link}
      to={{
        pathname: RoutesPaths.Admin.QuestionsDetails,
        state: { questionId: itemId },
      }}>
      <EditIcon color={'primary'} />
    </IconButton>
  );
};

const AdviserQuestionTable = ({ currentUser }) => {
  console.log('=============== hi from adviser list ===========');
  const { fetchedData: questions } = useFetchData(() =>
    fetchQuestionsOfAdviser(currentUser.id),
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
