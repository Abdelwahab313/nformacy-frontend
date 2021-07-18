import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import LinkText from 'components/typography/LinkText';
import { getUserCountryLabel } from 'core/user';
import {
  getProjectBeneficiariesList,
  getProjectConsultantsList,
  getProjectDetails,
} from 'services/navigation';
import ColoredFieldsChips from 'components/chips/ColoredFieldsChips';

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const columns = [
    {
      name: 'projectNumber',
      label: t('projectNumber'),
      options: {
        ...defaultColumnOption,
        display: true,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'title',
      label: t('title'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'details',
      label: t('details'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'duration',
      label: t('duration'),
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
      name: 'consultants',
      label: t('consultants'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
    {
      name: 'beneficiaries',
      label: t('beneficiaries'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'askCredit',
      label: t('ask'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
    {
      name: 'mentoring',
      label: t('mentoring'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
    {
      name: 'assign',
      label: t('assign'),
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
    projectNumber: (
      <LinkText to={getProjectDetails()}>{project.projectNumber}</LinkText>
    ),
    country: getUserCountryLabel(project.country),
    fields: <ColoredFieldsChips fields={project.fields} />,
    consultants: (
      <LinkText to={getProjectConsultantsList()}>
        {project.consultants}
      </LinkText>
    ),
    beneficiaries: (
      <LinkText to={getProjectBeneficiariesList()}>
        {project.beneficiaries}
      </LinkText>
    ),
  }));
};

const ProjectsTable = ({ projects }) => {
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
      title={t('projectsList')}
      data={!!projectsRows ? projectsRows : []}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default ProjectsTable;
