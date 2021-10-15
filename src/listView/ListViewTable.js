import React from 'react';
import PropTypes from 'prop-types';
import { TableContainer, StyledDataGrid } from '../styles/styles';
import { TABLE_COLUMNS, NUM_TABLE_ROWS } from '../constants';

export const ListViewTable = ({
  isLoading,
  tableRows,
  onPageChange,
  page,
  onRowClick,
}) => (
  <TableContainer>
    <StyledDataGrid
      rows={tableRows}
      columns={TABLE_COLUMNS}
      pageSize={NUM_TABLE_ROWS}
      rowsPerPageOptions={[NUM_TABLE_ROWS]}
      onPageChange={onPageChange}
      page={page}
      onRowClick={onRowClick}
      loading={isLoading}
    />
  </TableContainer>
);

ListViewTable.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  tableRows: PropTypes.array.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  onRowClick: PropTypes.func.isRequired,
};
