import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import FieldsChips from 'components/chips/FieldsChips';
import { getConsultantLevel, getUserCountryLabel } from 'core/user';
import Checkbox from '@material-ui/core/Checkbox';

export const getProjectState = (user) => {
  const stateStrings = {
    1: 'Registration',
    2: 'full profile',
    3: 'interview',
  };
  const level = getConsultantLevel(user);
  return stateStrings[level] || 'Active';
};

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const columns = [
    {
      name: 'firstName',
      label: t('firstName'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'lastName',
      label: t('lastName'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },

    {
      name: 'fields',
      label: t('fieldsAssigned'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
    {
      name: 'country',
      label: t('location'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
    {
      name: 'checked',
      label: t('checked'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
  ];

  return columns;
};

const parseProjectsTableData = (projects) => {
  return projects?.map((project) => ({
    ...project,
    state: getProjectState(project),
    country: getUserCountryLabel(project.country),
    fields: <FieldsChips fields={project.fields} />,
    checked: (
      <Checkbox
        color='primary'
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    ),
  }));
};

const AddConsultantsTable = ({ projects }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = getColumnsOptions(classes, t);
  const projectsRows = parseProjectsTableData(projects);
  const tableOptions = {
    filterType: 'checkbox',
    selectableRows: 'none',
    responsive: 'standard',
    fixedHeader: true,
    download: false,
    print: false,
    viewColumns: authManager.isAdmin(),
    rowsPerPage: process.env.REACT_APP_ENV === 'e2e' ? 300 : 10,
    setRowProps: (row) => ({
      'row-reference': row[0],
    }),
  };
  return (
    <MUIDataTable
      title={t('consultantsList')}
      data={!!projectsRows ? projectsRows : []}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default AddConsultantsTable;
