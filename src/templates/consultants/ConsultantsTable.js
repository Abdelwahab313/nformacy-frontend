import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import { Chip } from '@material-ui/core';
import FieldsChips from 'components/chips/FieldsChips';
import LinkText from 'components/typography/LinkText';
import { getConsultantDetails } from 'services/navigation';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';

import { getConsultantLevel } from 'core/user';

export const getConsultantState = (user) => {
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
      name: 'consultantRef',
      label: t('consultantRef'),
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
        filter: true,
      },
    },
    {
      name: 'state',
      label: t('state'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
    {
      name: 'fieldsAssigned',
      label: t('fieldsAssigned'),
      options: {
        ...defaultColumnOption,
        filter: true,
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
      name: 'preference',
      label: t('preference'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
    {
      name: 'numOfAnswers',
      label: t('numOfAnswers'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'numOfCalls',
      label: t('numOfCalls'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'numOfDays',
      label: t('numOfDays'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'points',
      label: t('points'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'grade',
      label: t('grade'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
  ];

  return columns;
};

const parseConsultantsTableData = (consultants) => {
  return consultants?.map((consultant) => ({
    ...consultant,
    industriesOfExperience: consultant.industriesOfExperience?.map(
      (industry) => (
        <div key={industry.value}>
          <Chip label={industry.label} key={industry.value} />
        </div>
      ),
    ),
    dateJoined: formattedDateTimeNoSeconds(new Date(consultant.createdAt)),
    state: getConsultantState(consultant),
    fields: <FieldsChips fields={consultant.fields} />,
    consultantRef: (
      <LinkText to={getConsultantDetails(consultant.id)}>
        {consultant.referenceNumber}
      </LinkText>
    ),
  }));
};

const ConsultantsTable = ({ consultants }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = getColumnsOptions(classes, t);
  const consultantsRows = parseConsultantsTableData(consultants);
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
      data={!!consultantsRows ? consultantsRows : []}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default ConsultantsTable;
