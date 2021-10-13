import React from 'react';
import { Link } from 'react-router-dom';

const TicketsComponent = ({ tickets }) => {
  // a function that assigns bootstrap styling classes based on
  // the status of the ticket
  const assignColorToTicketStatus = (ticket) => {
    if (ticket.sales_status === 'Validated') {
      return 'p-3 mb-2 bg-success text-green';
    } else {
      return 'p-3 mb-2 bg-warning text-dark';
    }
  };
  return (
    <div className="container">
      {tickets.length === 0 ? (
        'You currently have no tickets created'
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Quantity</th>
              <th scope="col">Cost price</th>
              <th scope="col">Sales price</th>
              <th scope="col">Status</th>
              <th scope="col">Brand</th>
              <th scope="col">Profile</th>
              <th scope="col">Vehicle</th>
              <th scope="col">Category</th>
              <th scope="col">Sold on</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.sales_id}>
                <td>{ticket.sales_id}</td>
                <td>{ticket.quantity}</td>
                <td>{ticket.price}</td>
                <td>{ticket.sales_price}</td>
                <td className={assignColorToTicketStatus(ticket)}>{ticket.sales_status}</td>
                <td>{ticket.brand}</td>
                <td>{ticket.profile}</td>
                <td>{ticket.vehicle}</td>
                <td>{ticket.category}</td>
                <td>{ticket.created_on}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TicketsComponent;
