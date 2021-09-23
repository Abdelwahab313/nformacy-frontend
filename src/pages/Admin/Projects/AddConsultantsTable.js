import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import { getUserCountryLabel } from 'core/user';
import Checkbox from '@material-ui/core/Checkbox';
import ColoredFieldsChips from 'components/chips/ColoredFieldsChips';

const CHECKED = 'yes';
const NOT_CHECKED = 'no';

const getColumnsOptions = (classes, t, setConsultantIds) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const getId = (tableMeta) => {
    return tableMeta.rowData[0];
  };

  const columns = [
    {
      name: 'id',
      label: t('projectNumber'),
      options: {
        ...defaultColumnOption,
        display: false,
        filter: false,
      },
    },
    {
      name: 'checked',
      label: t('checked'),
      options: {
        ...defaultColumnOption,
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const currentConsultantId = getId(tableMeta);
          return (
            <Checkbox
              color='primary'
              checked={value === CHECKED}
              onChange={(e) => {
                if (e.target.checked) {
                  setConsultantIds((prevConsultantIds) => [
                    ...prevConsultantIds,
                    currentConsultantId,
                  ]);
                } else {
                  setConsultantIds((prevConsultantIds) => [
                    ...prevConsultantIds.filter(
                      (consultantId) => consultantId !== currentConsultantId,
                    ),
                  ]);
                }
              }}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
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
      name: 'email',
      label: t('email'),
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
        filter: false,
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

const parseConsultantsTableData = (consultants, consultantIds) => {
  return consultants?.map((consultant) => ({
    ...consultant,
    country: getUserCountryLabel(consultant.country),
    fields: <ColoredFieldsChips fields={consultant.fields} />,
    checked: consultantIds?.includes(consultant.id) ? CHECKED : NOT_CHECKED,
  }));
};

const AddConsultantsTable = ({
  consultants,
  consultantIds,
  setConsultantIds,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = getColumnsOptions(classes, t, setConsultantIds);
  const consultantsRows = parseConsultantsTableData(consultants, consultantIds);
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
