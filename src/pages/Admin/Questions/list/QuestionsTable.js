import React from 'react';

import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import humanizedTimeSpan from 'services/humanizedTimeSpan';
import { Link } from 'react-router-dom';
import { RoutesPaths } from 'constants/routesPath';


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
    },
  },
  {
    name: 'content',
    label: 'Content',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => {
        return (
          <TextCroppedWithTooltip text={value}/>
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
    name: 'closeDate',
    label: 'Close Date',
    options: {
      filter: true,
      sort: false,
      customBodyRender: (value) => {
        return (
          humanizedTimeSpan(value)
        );
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
          return <Chip style={{ margin: 4 }} label={val.label} key={key.value}/>;
        });
      },
    },
  },
  {
    name: 'isApproved',
    label: 'Is Approved',
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => {
        return (
          value.toString()
        );
      },
    },
  },
  {
    name: 'Options',
    options: {
      filter: false,
      sort: false,
      empty: true,
      customBodyRender: (value, tableMeta) => {
        return (
          <ActionRow itemId={tableMeta.rowData[0]}/>
        );
      },
    },
  },
];

const TextCroppedWithTooltip = ({ text }) => {
  return (
    <Tooltip title={(<Typography variant={'body2'}>{text}</Typography>)} arrow>
      <Typography noWrap style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '11rem' }}>
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
      }}
    >
      <EditIcon color={'primary'}/>
    </IconButton>
  );
};

const QuestionsTable = ({ questions }) => {

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