import React from 'react';
import MUIDataTable from 'mui-datatables';
import authManager from 'services/authManager';
import { is_E2E_Running } from 'settings';

const MaterialDataTable = ({ title, data, columns, options = {} }) => {
  const tableOptions = {
    filterType: 'checkbox',
    selectableRows: 'none',
    responsive: 'standard',
    fixedHeader: true,
    download: false,
    print: false,
    viewColumns: authManager.isAdmin(),
    rowsPerPage: is_E2E_Running ? 300 : 10,
    setRowProps: (row) => ({
      'row-reference': row[0],
    }),
    ...options,
  };

  return (
    <MUIDataTable
      title={title}
      data={!!data ? data : []}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default MaterialDataTable;
