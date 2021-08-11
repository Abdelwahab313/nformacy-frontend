import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import LinkText from 'components/typography/LinkText';
import {
  getProjectBeneficiariesList,
  getProjectConsultantsList,
  getProjectDetails,
} from 'services/navigation';
import ColoredFieldsChips from 'components/chips/ColoredFieldsChips';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const columns = [
    {
      name: 'id',
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
      name: 'countries',
      label: t('location'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
    {
      name: 'consultantsCount',
      label: t('consultants'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
    {
      name: 'beneficiariesCount',
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
    id: <LinkText to={getProjectDetails()}>{project.id}</LinkText>,

    duration: `${formattedDateTimeNoSeconds(
      new Date(project.startDate),
    )} - ${formattedDateTimeNoSeconds(new Date(project.endDate))}  `,

    fields: <ColoredFieldsChips fields={project.fields} />,

    countries: project.countries.map((country) => country.label),

    consultantsCount: (
      <LinkText to={getProjectConsultantsList()}>
        {project.consultantsCount}
      </LinkText>
    ),

    beneficiariesCount: (
      <LinkText to={getProjectBeneficiariesList()}>
        {project.beneficiariesCount}
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
