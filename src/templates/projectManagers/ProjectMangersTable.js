import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import FieldsChips from 'components/chips/FieldsChips';
import LinkText from 'components/typography/LinkText';
import { getProjectManagerDetails } from 'services/navigation';

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const columns = [
    {
      name: 'projectMangerRef',
      label: t('projectMangerRef'),
      options: {
        ...defaultColumnOption,
        display: true,
        filter: false,
        sort: false,
      },
    },
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
      name: 'email',
      label: t('email'),
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
        filter: false,
      },
    },
    {
      name: 'assignedProjects',
      label: t('assignedProjects'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    
    {
      name: 'status',
      label: t('Status'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
  ];

  return columns;
};

const parseProjectManagersTableData = (projectManagers) => {
  return projectManagers?.map((projectManager) => ({
    ...projectManager,
    fields: <FieldsChips fields={projectManager.fields} />,
    projectMangerRef:
      <LinkText to={getProjectManagerDetails(projectManager.id)}>
        {projectManager.referenceNumber}
      </LinkText>,
  }));
};

const ProjectMangersTable = ({ projectManagers }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = getColumnsOptions(classes, t);
  const projectManagersRows = parseProjectManagersTableData(projectManagers);

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
      title={t('projectManagersList')}
      data={!!projectManagersRows ? projectManagersRows : []}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default ProjectMangersTable;
