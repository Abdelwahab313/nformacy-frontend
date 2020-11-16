import React from 'react';

import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { RoutesPaths } from 'constants/routesPath';
import QuestionRemainingTimeAlarm from 'components/feedback/QuestionRemainingTimeAlarm';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import { serviceActions } from 'constants/questionStatus';
import { questionTypesOfAssignment } from 'constants/dropDownOptions';
import { useStyles } from 'styles/Admin/questionTableStyles';
import FieldsChips from 'components/chips/FieldsChips';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import LinkText from 'components/typography/LinkText';
import TextCroppedWithTooltip from 'components/typography/TextCroppedWithTooltip';

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
        customBodyRender: (value, tableMeta) => {
          return (
            <LinkText
              data-status={tableMeta.rowData[0]}
              data-reference={tableMeta.rowData[0]}
              to={getServiceDetailsLink(tableMeta.rowData[0])}>
              <TextCroppedWithTooltip text={value} />
            </LinkText>
          );
        },
      },
    },
    {
      name: 'userId',
      label: t('clientId'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
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
      name: 'createdAt',
      label: t('createdAt'),
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
      name: 'title',
      label: t('title'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <LinkText
              data-status={tableMeta.rowData[10]}
              data-reference={tableMeta.rowData[0]}
              to={{
                pathname: RoutesPaths.Admin.QuestionsDetails,
                state: {
                  questionId: tableMeta.rowData[0],
                },
              }}>
              <TextCroppedWithTooltip text={value} />
            </LinkText>
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
      name: 'language',
      label: t('languageField'),
      options: {
        ...defaultColumnOption,
        filter: false,
        customBodyRender: (value) => {
          return (
            <Typography
              className={classes.answersCount}
              variant='body1'
              gutterBottom>
              {value}
            </Typography>
          );
        },
      },
    },
    {
      name: 'questionId',
      label: t('serviceQuestionId'),
      options: {
        ...defaultColumnOption,
        filter: false,
        display: authManager.isAdmin(),
        customBodyRender: (value) => {
          return (
            <Typography
              className={classes.answersCount}
              variant='body1'
              gutterBottom>
              {value}
            </Typography>
          );
        },
      },
    },
    {
      name: 'answersCount',
      label: t('answersCount'),
      options: {
        ...defaultColumnOption,
        filter: false,
        display: authManager.isAdmin(),
        customBodyRender: (value) => {
          return (
            <Typography
              className={classes.answersCount}
              variant='body1'
              gutterBottom>
              {value}
            </Typography>
          );
        },
      },
    },
    {
      name: 'state',
      label: t('state'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
        customBodyRender: (status) => {
          const currentUserRole = authManager.getUserRole();
          const statusString = serviceActions[currentUserRole][status]?.status;
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
            />
          );
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

const StyledStatusChip = withStyles({
  root: {
    margin: 1,
    backgroundColor: '#cec8ef',
  },
  label: {
    fontSize: '0.8rem',
  },
})(Chip);

const ServiceActionLink = ({ status, serviceId, questionId }) => {
  const { t } = useTranslation();
  const currentUserRole = authManager.getUserRole();
  const actionNeeded = serviceActions[currentUserRole][status]?.action;
  if (!actionNeeded) {
    return '';
  }

  const redirectURL = !!questionId
    ? getQuestionDetailsLink(questionId)
    : getServiceDetailsLink(serviceId);
  return (
    <LinkText to={redirectURL}>
      <StyledStatusChip
        data-status={status}
        className={'state'}
        data-reference={serviceId}
        label={t(`serviceStatus:${actionNeeded}`)}
      />
    </LinkText>
  );
};

const getQuestionDetailsLink = (questionId) => {
  return {
    pathname: authManager.isAdmin()
      ? RoutesPaths.Admin.QuestionsDetails
      : RoutesPaths.App.QuestionsDetails,
    state: {
      questionId: questionId,
    },
  };
};

const getServiceDetailsLink = (serviceId) => {
  return {
    pathname: authManager.isAdmin()
      ? RoutesPaths.Admin.ServiceDetails
      : RoutesPaths.App.ServiceRequestDetails,
    state: {
      serviceId: serviceId,
    },
  };
};

const ServicesTable = ({ services }) => {
  const classes = useStyles();
  const { t } = useTranslation();
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
      title={'Service Requests List'}
      data={services}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default ServicesTable;
