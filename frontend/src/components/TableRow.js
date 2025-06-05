import React from 'react';

function TableRow({ row }) {
  return (
    <tr>
      <td>{row.name}</td>
      <td>{row.date}</td>
      <td>{row.type}</td>
      <td>{row.from}</td>
      <td>{row.to}</td>
      {/* <td>{row.description}</td> */}
      <td>{row.availability}</td>
      <td>{row.time}</td>
      <td>{row.price}</td>
      
    </tr>
  );
}

export default TableRow;
