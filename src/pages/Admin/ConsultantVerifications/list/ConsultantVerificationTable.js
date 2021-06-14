import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';

import RefIDLink from 'components/dataTableElements/RefIDLink';
import { getConsultantDetails, getConsultantEvaluationFormPage, getMeetingDetailsPage } from 'services/navigation';
import QuestionCountDown from 'components/counters/QuestionCountDown';
import LinkText from 'components/typography/LinkText';

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const columns = [
    {
      name: 'consultantId',
      options: {
        ...defaultColumnOption,
        display: false,
        filter: false,
      },
    },
    {
      name: 'consultantRef',
      label: t('consultantId'),
      options: {
        ...defaultColumnOption,
        display: true,
        filter: false,
        sort: true,
        customBodyRender: (consultantId, tableMeta) => {
          return (
            <RefIDLink refID={consultantId} onClickLink={() => getConsultantDetails(tableMeta.rowData[0])} />
          );
        },
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
      name: 'dateScheduled',
      label: t('dateScheduled'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
    {
      name: 'id',
      label: t('meeting'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
        customBodyRender: (meetingId) => {
          return (
            <RefIDLink refID={meetingId} onClickLink={() => getMeetingDetailsPage(meetingId)} />
          );
        },
      },
    },
    {
      name: 'verificationForm',
      label: t('verificationForm'),
      options: {
        ...defaultColumnOption,
        filter: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <LinkText to={getConsultantEvaluationFormPage(tableMeta.rowData[0])}>
              Evaluate
            </LinkText>

          );
        },
      },
    },
    {
      name: 'callTime',
      label: t('time'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
        customBodyRender: (callTime) => {
          return (
            <QuestionCountDown
              date={callTime}
              data-date={callTime}
              showIcon={false}
              className={'currentActionTime'}
            />
          )
        }
      },
    },
  ];

  return columns;
};

const parseMeetingsTableData = (meetings) => {
  return meetings?.map((meeting) => ({
    ...meeting,
    firstName: meeting?.freelancer?.firstName,
    lastName: meeting?.freelancer?.lastName,
    dateScheduled: formattedDateTimeNoSeconds(new Date(meeting.createdAt)),
    consultantId: meeting?.freelancer?.id,
    consultantRef: meeting?.freelancer?.referenceNumber
  }));
};

const ConsultantVerificationTable = ({ meetings }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = getColumnsOptions(classes, t);
  const consultantsRows = parseMeetingsTableData(meetings);
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
      title={t('consultantVerification')}
      data={!!consultantsRows ? consultantsRows : []}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default ConsultantVerificationTable;
