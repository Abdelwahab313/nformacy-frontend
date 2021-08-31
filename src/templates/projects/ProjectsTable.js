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
import { formatDate } from 'services/dateTimeParser';
import CheckBox from 'components/inputs/CheckBox';

const checked = 'yes';
const notChecked = 'no';

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };


  const generateLinkText = (projectId, value, cb) => {
    return <LinkText to={cb(projectId || value)}>
      {value}
    </LinkText>;
  };


  const getProjectId = (tableMeta) => {
    return tableMeta.rowData[0];
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
        customBodyRender: (value) => {
          return generateLinkText(null, value, getProjectDetails);
        },
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
        sort: false
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
        customBodyRender: (value, tableMeta) => {
          const projectId = getProjectId(tableMeta);
          return generateLinkText(projectId, value, getProjectConsultantsList);
        },
      },
    },
    {
      name: 'beneficiariesCount',
      label: t('beneficiaries'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const projectId = getProjectId(tableMeta);
          return generateLinkText(projectId, value, getProjectBeneficiariesList);
        }
      },
    },
    {
      name: 'askEnabled',
      label: t('ask'),
      options: {
        ...defaultColumnOption,
        filter: true,
        customBodyRender: (value) => {
          return <ProjectSettingEnabledCheck checked={value === checked} />;
        }
      },
    },
    {
      name: 'mentoringEnabled',
      label: t('mentoring'),
      options: {
        ...defaultColumnOption,
        filter: true,
        customBodyRender: (value) => {
          return <ProjectSettingEnabledCheck checked={value === checked} />;
        }
      },
    },
    {
      name: 'assignEnabled',
      label: t('assign'),
      options: {
        ...defaultColumnOption,
        filter: true,
        customBodyRender: (value) => {
          return <ProjectSettingEnabledCheck checked={value === checked} />;
        }
      },
    },
    {
      name: 'callEnabled',
      label: t('call'),
      options: {
        ...defaultColumnOption,
        filter: true,
        customBodyRender: (value) => {
          return <ProjectSettingEnabledCheck checked={value === checked} />;
        }
      },
    },
  ];

  return columns;
};

const ProjectSettingEnabledCheck = ({ checked }) => {
  return <CheckBox checked={checked} disabled />;
};


const renderCountries = (countries) => {
  if (!countries) return '-';
  if (countries.length <= 1) return countries[0].label;
  let countriesInSingleString = '';
  countries.forEach((country) => countriesInSingleString += `${country.label}, `);
  return countriesInSingleString;
};



const parseProjectsTableData = (projects) => {
  return projects?.map((project) => ({
    ...project,
    id: project.id,
    duration: `${formatDate(new Date(project.startDate))} - \n ${formatDate(
      new Date(project.endDate),
    )}  `,
    fields: <ColoredFieldsChips fields={project.fields} />,
    countries: renderCountries(project.countries),
    consultantsCount: project.consultantsCount,
    beneficiariesCount: project.beneficiariesCount,
    askEnabled: project?.askSettings?.isEnabled ? checked : notChecked,
    mentoringEnabled: project?.mentorSettings?.isEnabled ? checked : notChecked,
    assignEnabled: project?.assignSettings?.isEnabled ? checked : notChecked,
    callEnabled: project?.callSettings?.isEnabled ? checked : notChecked
  }));
};



const ProjectsTable = ({ projects }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = getColumnsOptions(classes, t, projects);
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
