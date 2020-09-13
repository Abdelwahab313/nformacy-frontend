import React from 'react';

import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { Link } from 'react-router-dom';
import { RoutesPaths } from 'constants/routesPath';

import useFetchData from 'hooks/useFetchData';
import { fetchAllQuestions } from '../../../../apis/questionsAPI';

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
    name: 'assignmentType',
    label: 'Assignment Type',
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: 'hoursToCloseAnswers',
    label: 'Close In',
    options: {
      filter: true,
      sort: false,
      customBodyRender: (value) => {
        return value;
      },
    },
  },
  {
    name: 'field',
    label: 'Fields',
    options: {
      filter: true,
      filterType: 'multiselect',
      customBodyRender: (value) => {
        return value.map((val, key) => {
          return (
            <Chip style={{ margin: 4 }} label={val.label} key={key.value} />
          );
        });
      },
    },
  },
  {
    name: 'state',
    label: 'Status',
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
    name: 'Options',
    options: {
      filter: false,
      sort: false,
      empty: true,
      customBodyRender: (value, tableMeta) => {
        return <ActionRow itemId={tableMeta.rowData[0]} />;
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

const QuestionsTable = () => {
  console.log('=============== hi from admin list ===========');

  const { fetchedData: questions } = useFetchData(() => fetchAllQuestions());
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
      title={'Questions List'}
      data={questions}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default QuestionsTable;
