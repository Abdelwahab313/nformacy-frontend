import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import parseServicesToTableRows from './parseServicesToTableRows';
import ServiceRefLink from './ServiceRefLink';
import {
  getClientProfileDetails,
  getQuestionDetailsLink,
} from 'services/navigation';
import FieldsChips from 'components/chips/FieldsChips';
import TextCroppedWithTooltip from 'components/typography/TextCroppedWithTooltip';
import CustomTypography from 'components/typography/Typography';
import { formattedDateMonthAndDay } from 'services/dateTimeParser';
import LinkText from 'components/typography/LinkText';
import QuestionCountDown from 'components/counters/QuestionCountDown';
import { IS_Nformacy_APP } from 'settings';

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const getServiceId = (tableMeta) => {
    return tableMeta.rowData[0];
  };

  const getServiceState = (tableMeta) => {
    return tableMeta.rowData[1];
  };

  const getQuestionId = (tableMeta) => {
    return tableMeta.rowData[2];
  };

  const columns = [
    // referential columns
    {
      name: 'rowServiceId',
      label: t('id'),
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'rowServiceState',
      label: t('rowState'),
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'rowQuestionId',
      label: t('rowQuestionId'),
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },

    // real data table starts from here
    {
      name: 'serviceRef',
      label: t('serviceReferenceNumber'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
        customBodyRender: (serviceRef, tableMeta) => {
          return (
            <ServiceRefLink
              serviceId={getServiceId(tableMeta)}
              serviceState={getServiceState(tableMeta)}
              referenceId={serviceRef}
            />
          );
        },
      },
    },
    {
      name: 'clientId',
      label: IS_Nformacy_APP ? t('clientRef') : t('beneficiaryId'),
      options: {
        ...defaultColumnOption,
        filter: false,
        display: authManager.isAdmin(),
        sort: true,
        customBodyRender: (clientId) => {
          return (
            <LinkText to={getClientProfileDetails(clientId)}>
              {`#${clientId}`}
            </LinkText>
          );
        },
      },
    },
    {
      name: 'requestType',
      label: t('assignmentType'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'createdAt',
      label: t('postDate'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
        customBodyRender: (createdAt) => {
          return (
            <CustomTypography variant='body2' gutterBottom>
              {formattedDateMonthAndDay(createdAt)}
            </CustomTypography>
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
        customBodyRender: (title) => {
          return <TextCroppedWithTooltip text={title} maxChar={15} />;
        },
      },
    },
    {
      name: 'fields',
      label: t('fields'),
      options: {
        ...defaultColumnOption,
        filter: true,
        display: authManager.isAdmin(),
        filterType: 'multiselect',
        customBodyRender: (fields) => {
          return <FieldsChips fields={fields} />;
        },
      },
    },
    {
      name: 'language',
      label: t('languageField'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: 'answersCount',
      label: t('answersCount'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
        display: authManager.isAdmin(),
      },
    },
    {
      name: 'questionRef',
      label: t('questionRef'),
      options: {
        ...defaultColumnOption,
        filter: false,
        display: authManager.isAdmin(),
        customBodyRender: (questionRef, tableMeta) => {
          return (
            <LinkText
              to={getQuestionDetailsLink(
                getQuestionId(tableMeta),
                getServiceId(tableMeta),
              )}>
              {questionRef ? `#${questionRef}` : ''}
            </LinkText>
          );
        },
      },
    },
    {
      name: 'status',
      label: t('state'),
      options: {
        ...defaultColumnOption,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'action',
      label: t('actionNeeded'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'actionTime',
      options: {
        filter: false,
        sort: true,
        customHeadLabelRender: () => (
          <Grid className={classes.currentActionTimeContainer}>By Time</Grid>
        ),
        customBodyRender: (actionTime) => {
          return (
            <QuestionCountDown
              date={actionTime}
              data-date={actionTime}
              showIcon={false}
              className={'currentActionTime'}
            />
          );
        },
      },
    },
    {
      name: 'alarm',
      label: t('alarm'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
  ];

  return columns;
};

const ServicesTable = ({ services }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = getColumnsOptions(classes, t);
  const servicesRows = parseServicesToTableRows(services, t);

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
      title={t('serviceRequestList')}
      data={servicesRows}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default ServicesTable;
