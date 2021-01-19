import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';

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
        display: true,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'name',
      label: t('name'),
      options: {
        ...defaultColumnOption,
        filter: false,
        display: authManager.isAdmin(),
        sort: true,
      },
    },
    {
      name: 'userName',
      label: t('userName'),
      options: {
        ...defaultColumnOption,
        filter: false,
        display: authManager.isAdmin(),
        sort: true,
      },
    },
    {
      name: 'fieldsAssigned',
      label: t('fieldsAssigned'),
      options: {
        ...defaultColumnOption,
        filter: true,
        display: authManager.isAdmin(),
      },
    },
    {
      name: 'industry',
      label: t('industry'),
      options: {
        ...defaultColumnOption,
        filter: true,
        display: authManager.isAdmin(),
        sort: true,
      },
    },
    {
      name: 'clientManager',
      label: t('clientManager'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
        display: authManager.isAdmin(),
      },
    },
    {
      name: 'consultantManager',
      label: t('consultantManager'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
        display: authManager.isAdmin(),
      },
    },
    {
      name: 'advisorManager',
      label: t('advisorManager'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
        display: authManager.isAdmin(),
      },
    },
    {
      name: 'update',
      label: t('update'),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
        display: authManager.isAdmin(),
      },
    },
  ];

  return columns;
};

const AdminsTable = () => {
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
      title={t('adminsList')}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default AdminsTable;
