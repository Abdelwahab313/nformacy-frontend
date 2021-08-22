import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import { getConsultantLevel, getUserCountryLabel } from 'core/user';
import Checkbox from '@material-ui/core/Checkbox';
import ColoredFieldsChips from 'components/chips/ColoredFieldsChips';

export const getBeneficiaryState = (user) => {
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

const parseBeneficiariesTableData = (
  beneficiaries,
  beneficiaryIds,
  setBeneficiaryIds,
) => {
  return beneficiaries?.map((beneficiary) => ({
    ...beneficiary,
    state: getBeneficiaryState(beneficiary),
    country: getUserCountryLabel(beneficiary.country),
    fields: <ColoredFieldsChips fields={beneficiary.fields} />,
    // TODO: handle onChange in checkbox
    checked: (
      <Checkbox
        color='primary'
        checked={beneficiaryIds?.includes(beneficiary.id)}
        onChange={(e) => {
          if (e.target.checked) {
            setBeneficiaryIds((prevBeneficiaryId) => [
              ...prevBeneficiaryId,
              beneficiary.id,
            ]);
          } else {
            setBeneficiaryIds((prevBeneficiaryId) => [
              ...prevBeneficiaryId.filter(
                (beneficiaryId) => beneficiaryId !== beneficiary.id,
              ),
            ]);
          }
        }}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    ),
  }));
};

const AddBeneficiariesTable = ({
  beneficiaries,
  beneficiaryIds,
  setBeneficiaryIds,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = getColumnsOptions(classes, t);
  const beneficiariesRows = parseBeneficiariesTableData(
    beneficiaries,
    beneficiaryIds,
    setBeneficiaryIds,
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
      title={t('beneficiariesList')}
      data={!!beneficiariesRows ? beneficiariesRows : []}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default AddBeneficiariesTable;
