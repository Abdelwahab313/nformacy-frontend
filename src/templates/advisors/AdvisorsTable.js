import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import { Chip } from '@material-ui/core';
import FieldsChips from 'components/chips/FieldsChips';
import LinkText from 'components/typography/LinkText';
import { getAdvisorDetails } from 'services/navigation';

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const columns = [
    {
      name: 'advisorRef',
      label: t('advisorRef'),
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
      name: 'dateJoined',
      label: t('dateJoined'),
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
      name: 'subFields',
      label: t('subFields'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'industriesOfExperience',
      label: t('industry'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'acceptedAssignment',
      label: t('acceptedAssignment'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'deadlineAssignment',
      label: t('deadlineAssignment'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'rating',
      label: t('rating'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'update',
      label: t('update'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
  ];

  return columns;
};

const parseAdvisorsTableData = (advisors) => {
  return advisors?.map((advisor) => ({
    ...advisor,
    industriesOfExperience: advisor.industriesOfExperience?.map((industry) => (
      <div key={industry.value}>
        <Chip label={industry.label} key={industry.value} />
      </div>
    )),
    fields: <FieldsChips fields={advisor.fields} />,
    advisorRef:
      <LinkText to={getAdvisorDetails(advisor.id)}>
        {advisor.referenceNumber}
      </LinkText>,
  }));
};

const AdvisorsTable = ({ advisors }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = getColumnsOptions(classes, t);
  const advisorsRows = parseAdvisorsTableData(advisors);

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
      title={t('advisorsList')}
      data={!!advisorsRows ? advisorsRows : []}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default AdvisorsTable;
