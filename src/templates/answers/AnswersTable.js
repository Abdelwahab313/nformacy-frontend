import React from 'react';

import MUIDataTable from 'mui-datatables';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import QuestionRemainingTimeAlarm from 'components/feedback/QuestionRemainingTimeAlarm';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';

import { questionTypesOfAssignment } from 'constants/dropDownOptions';
import { useStyles } from 'styles/Admin/questionTableStyles';
import FieldsChips from 'components/chips/FieldsChips';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import LinkText from 'components/typography/LinkText';
import TextCroppedWithTooltip from 'components/typography/TextCroppedWithTooltip';
import { getServiceStatus } from 'core/serviceStatus';
import ByTimeField from 'pages/Admin/Questions/list/subComponents/ByTimeField';
import { getServiceDetailsLink } from 'services/navigation';
import ServiceActionLink from '../services/ServiceActionLink';

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const columns = [
    {
      name: 'id',
      label: t('id'),
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'referenceNumber',
      label: t('serviceReferenceNumber'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
        customBodyRender: (referenceId, tableMeta) => {
          return (
            <ServiceRefIdLink
              serviceId={tableMeta.rowData[0]}
              referenceId={referenceId}
            />
          );
        },
      },
    },
    {
      name: 'assignmentType',
      label: t('assignmentType'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          const assignmentLabel = questionTypesOfAssignment.filter(
            (assignmentOption) => assignmentOption.value === value,
          )[0]?.label;
          return assignmentLabel;
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
        customBodyRender: (value, tableMeta) => {
          return (
            <LinkText
              data-reference={tableMeta.rowData[0]}
              to={getServiceDetailsLink(tableMeta.rowData[0])}>
              <TextCroppedWithTooltip text={value} />
            </LinkText>
          );
        },
      },
    },
    {
      name: 'createdAt',
      label: t('postDate'),
      options: {
        ...defaultColumnOption,
        filter: false,
        customBodyRender: (value) => {
          return (
            <Typography
              className={classes.nowrapText}
              variant='body2'
              gutterBottom>
              {formattedDateTimeNoSeconds(new Date(value))}
            </Typography>
          );
        },
      },
    },
    {
      name: 'fields',
      label: t('fields'),
      options: {
        ...defaultColumnOption,
        filter: false,
        filterType: 'multiselect',
        customBodyRender: (fields) => <FieldsChips fields={fields} />,
      },
    },
    {
      name: 'questionId',
      label: t('serviceQuestionId'),
      options: {
        ...defaultColumnOption,
        filter: false,
        display: false,
      },
    },
    {
      name: 'questionState',
      label: t('Question State'),
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'state',
      label: t('state'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
        customBodyRender: (status, tableMeta) => {
          const statusString = getServiceStatus(status, tableMeta.rowData[9]);
          return t(`serviceStatus:${statusString}`);
        },
      },
    },
    {
      name: 'state',
      label: t('actionNeeded'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: false,
        customBodyRender: (status, tableMeta) => {
          return (
            <ServiceActionLink
              status={status}
              serviceId={tableMeta.rowData[0]}
              questionId={tableMeta.rowData[8]}
              questionState={tableMeta.rowData[9]}
            />
          );
        },
      },
    },
    {
      name: 'currentActionTime',
      options: {
        filter: false,
        display: authManager.isAdmin(),
        sort: true,
        customHeadLabelRender: () => (
          <Grid className={classes.currentActionTimeContainer}>By Time</Grid>
        ),
        customBodyRender: (currentActionTime, tableMeta) => {
          return currentActionTime ? (
            <ByTimeField
              currentActionTime={currentActionTime}
              referenceId={tableMeta.rowData[0]}
              questionId={tableMeta.rowData[8]}
            />
          ) : null;
        },
      },
    },
    {
      name: 'currentActionTime',
      label: t('alarm'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
        customBodyRender: (currentActionTime, tableMeta) => {
          return (
            <QuestionRemainingTimeAlarm
              remainingTime={currentActionTime}
              totalActionHours={10}
              className={'alarm'}
              data-reference={tableMeta.rowData[0]}
            />
          );
        },
      },
    },
  ];

  return columns;
};

export const ServiceRefIdLink = ({ serviceId, referenceId }) => {
  return (
    <LinkText data-reference={serviceId} to={getServiceDetailsLink(serviceId)}>
      <TextCroppedWithTooltip text={`#${referenceId}`} />
    </LinkText>
  );
};

const AnswersTable = ({ answers }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  // const answersToDisplay = answers.map((answer) => {
  //   const { question, ...answerData } = answer;
  //   const { service, ...questionData } = question;
  //   return { ...answerData, question: questionData, service: service };
  // });
  const columns = getColumnsOptions(classes, t);

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
      title={t('answersList')}
      data={answers}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default AnswersTable;
