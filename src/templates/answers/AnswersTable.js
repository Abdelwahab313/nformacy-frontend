import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';

import { useStyles } from 'styles/Admin/questionTableStyles';
import FieldsChips from 'components/chips/FieldsChips';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import LinkText from 'components/typography/LinkText';
import TextCroppedWithTooltip from 'components/typography/TextCroppedWithTooltip';
import { getAnswerQuestionLink } from 'services/navigation';
import CustomTypography from 'components/typography/Typography';
import { getAnswerState } from 'core/answerStatus';
import FreelancerAnswerActionLink from './FreelancerAnswerActionLink';
import FreelancerAnswerTime from './FreelancerAnswerTime';
import QuestionRemainingTimeAlarm from 'components/feedback/QuestionRemainingTimeAlarm';

const formatAnswersToTable = (answers) => {
  return answers.map((answer) => ({
    id: answer.id,
    questionId: answer.question.id,
    answerState: answer.state,
    questionState: answer.question.state,
    serviceState: answer.question.service?.referenceNumber,
    serviceReferenceNumber: answer.question.service?.referenceNumber,
    questionTime: answer.question.currentActionTime,
    assignmentType: answer.question.assignmentType,
    title: answer.question.title,
    createdAt: answer.question.createdAt,
    // fields: answer.question.fields,
    fields: () => <FieldsChips fields={answer.question.fields} />,
  }));
};

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const columns = [
    // data for refernce
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
    // display data
    {
      name: 'serviceReferenceNumber',
      label: t('serviceReferenceNumber'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
        customBodyRender: (referenceId) => {
          return referenceId;
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
          return t(value);
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
            <LinkText to={getAnswerQuestionLink(tableMeta.rowData[1])}>
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
            <CustomTypography
              className={classes.nowrapText}
              variant='body2'
              gutterBottom>
              {formattedDateTimeNoSeconds(new Date(value))}
            </CustomTypography>
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
      },
    },
    {
      name: 'answerState',
      label: t('state'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
        customBodyRender: (answerState) =>
          t(`answerStatus:${getAnswerState(answerState)}`),
      },
    },
    {
      name: 'answerState',
      label: t('actionNeeded'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: false,
        customBodyRender: (answerState, tableMeta) => {
          return (
            <FreelancerAnswerActionLink
              answerStatus={answerState}
              questionId={tableMeta.rowData[1]}
            />
          );
        },
      },
    },
    {
      name: 'questionTime',
      options: {
        filter: false,
        sort: true,
        customHeadLabelRender: () => (
          <Grid className={classes.currentActionTimeContainer}>By Time</Grid>
        ),
        customBodyRender: (currentActionTime) => {
          return <FreelancerAnswerTime currentActionTime={currentActionTime} />;
        },
      },
    },
    {
      name: 'questionTime',
      label: t('alarm'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
        customBodyRender: (currentActionTime) => {
          return (
            <QuestionRemainingTimeAlarm
              remainingTime={currentActionTime}
              totalActionHours={10}
              className={'alarm'}
            />
          );
        },
      },
    },
  ];

  return columns;
};

const AnswersTable = ({ answers }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const answersFormatted = formatAnswersToTable(answers);
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
      data={answersFormatted}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default AnswersTable;
