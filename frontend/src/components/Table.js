import React from 'react';
import TableRow from './TableRow';

function Table({ rows, onDelete }) {
  return (
    <table className="spreadsheet-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Type</th>
          <th>Location From</th>
          <th>Location To</th>
          {/* <th>Description</th> */}
          <th>Availability</th>
          <th>Time</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <TableRow key={row.id} row={row} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
