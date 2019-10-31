import React from 'react';
import { Table } from 'react-bootstrap';

const ClientsList = (props) => (
  <Table responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      {props.clients.map((client, index) => (
        <tr id={'row-' + index}>
          <td>{index + 1}</td>
          <td>{client.name}</td>
          <td>{client.address}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default ClientsList;
