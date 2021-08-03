import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import { getConsultantLevel, getUserCountryLabel } from 'core/user';
import Checkbox from '@material-ui/core/Checkbox';
import ColoredFieldsChips from 'components/chips/ColoredFieldsChips';

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
      name: 'checked',
      label: t('checked'),
      options: {
        ...defaultColumnOption,
        filter: true,
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
      name: 'fields',
      label: t('fieldsAssigned'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
    {
      name: 'country',
      label: t('location'),
      options: {
        ...defaultColumnOption,
        filter: true,
      },
    },
  ];

  return columns;
};

const parseConsultantsTableData = (consultants, setConsultantIds) => {
  return consultants?.map((consultant) => ({
    ...consultant,
    state: getConsultantState(consultant),
    country: getUserCountryLabel(consultant.country),
    fields: <ColoredFieldsChips fields={consultant.fields} />,
    checked: (
      // TODO: handle onChange in checkbox
      <Checkbox
        color='primary'
        onChange={(e) => {
          if (e.target.checked) {
            setConsultantIds((prevConsultantId) => [
              ...prevConsultantId,
              consultant.id,
            ]);
          } else {
            setConsultantIds((prevConsultantId) => [
              ...prevConsultantId.filter(
                (consultantId) => consultantId !== consultant.id,
              ),
            ]);
          }
        }}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    ),
  }));
};

const AddConsultantsTable = ({ consultants, setConsultantIds }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = getColumnsOptions(classes, t);
  const consultantsRows = parseConsultantsTableData(
    consultants,
    setConsultantIds,
  );
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

export default AddConsultantsTable;
