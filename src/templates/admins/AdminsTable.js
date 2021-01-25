import React from 'react';

import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'styles/Admin/questionTableStyles';
import authManager from 'services/authManager';
import { useTranslation } from 'react-i18next';
import { Chip } from '@material-ui/core';
import FieldsChips from 'components/chips/FieldsChips';
import LinkText from 'components/typography/LinkText';
import { getAdminDetails } from 'services/navigation';
import { ADMIN_ROLES } from 'constants/userRoles';
import CheckBox from 'components/inputs/CheckBox';

const getColumnsOptions = (classes, t) => {
  const defaultColumnOption = {
    customHeadLabelRender: ({ label }) => (
      <Grid className={classes.columnHeader}>{label}</Grid>
    ),
  };

  const columns = [
    {
      name: 'adminRef',
      label: t('adminRef'),
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
      name: 'fields',
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
      name: ADMIN_ROLES.clientsManager,
      label: t(ADMIN_ROLES.clientsManager),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: ADMIN_ROLES.consultantsManager,
      label: t(ADMIN_ROLES.consultantsManager),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: ADMIN_ROLES.advisorsManager,
      label: t(ADMIN_ROLES.advisorsManager),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: ADMIN_ROLES.requestsManager,
      label: t(ADMIN_ROLES.requestsManager),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
    {
      name: ADMIN_ROLES.questionsManager,
      label: t(ADMIN_ROLES.questionsManager),
      options: {
        ...defaultColumnOption,
        filter: false,
        sort: true,
      },
    },
  ];

  return columns;
};

const parseAdminsTableData = (admins) => {
  return admins?.map((admin) => ({
    ...admin,
    industriesOfExperience: admin.industriesOfExperience?.map((industry) => (
      <div key={industry.value}>
        <Chip label={industry.label} key={industry.value} />
      </div>
    )),
    fields: <FieldsChips fields={admin.fields} />,
    adminRef:
      <LinkText to={getAdminDetails(admin.id)}>
        {admin.referenceNumber}
      </LinkText>,
    [ADMIN_ROLES.clientsManager]: (
      <AdminRoleCheck
        assignedRoles={admin.assignedRoles}
        role={ADMIN_ROLES.clientsManager}
      />
    ),
    [ADMIN_ROLES.consultantsManager]: (
      <AdminRoleCheck
        assignedRoles={admin.assignedRoles}
        role={ADMIN_ROLES.consultantsManager}
      />
    ),
    [ADMIN_ROLES.advisorsManager]: (
      <AdminRoleCheck
        assignedRoles={admin.assignedRoles}
        role={ADMIN_ROLES.advisorsManager}
      />
    ),
    [ADMIN_ROLES.requestsManager]: (
      <AdminRoleCheck
        assignedRoles={admin.assignedRoles}
        role={ADMIN_ROLES.requestsManager}
      />
    ),
    [ADMIN_ROLES.questionsManager]: (
      <AdminRoleCheck
        assignedRoles={admin.assignedRoles}
        role={ADMIN_ROLES.questionsManager}
      />
    ),
  }));
};

const AdminRoleCheck = ({ assignedRoles, role }) => {
  return <CheckBox checked={!!assignedRoles?.includes(role)} disabled />;
};

const AdminsTable = ({ admins }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = getColumnsOptions(classes, t);
  const adminsRows = parseAdminsTableData(admins);
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
      data={!!adminsRows ? adminsRows : []}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default AdminsTable;
