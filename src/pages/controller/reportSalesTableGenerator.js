import jsPDF from 'jspdf';
import 'jspdf-autotable';
// Date Fns is used to format the dates we receive
// from our API call
import { format } from 'date-fns';

// define a generatePDF function that accepts a tickets argument
const generateTablePDF = (tickets) => {
  // for (const property in tickets) {
  //   console.log(`${property}: ${tickets[property]}`);
  // }
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = [
    'Id',
    'Client',
    'Quantity',
    'Cost price',
    'Sales price',
    'Status',
    'Brand',
    'Profile',
    'Vehicle',
    'Category',
    'Sold on'
  ];
  // define an empty array of rows
  const tableRows = [];

  // }

  const ticketData = [
    tickets.sales_id,
    tickets.customer_name,
    tickets.quantity,
    tickets.price,
    tickets.sales_price,
    tickets.sales_status ? 'Validated' : 'Pending',
    tickets.brand_name,
    tickets.profile_name,
    tickets.vehicle_name,
    tickets.category,
    tickets.created_on,
    // called date-fns to format the date on the ticket
    format(new Date(tickets.created_on), 'yyyy-MM-dd')
  ];
  // push each tickcet's info into a row
  tableRows.push(ticketData);

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(' ');
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text(tickets.warehouse + ' Sales Report.', 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generateTablePDF;
