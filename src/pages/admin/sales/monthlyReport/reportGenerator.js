import jsPDF from 'jspdf';
import 'jspdf-autotable';
// Date Fns is used to format the dates we receive
// from our API call
import { format } from 'date-fns';

// define a generatePDF function that accepts a tickets argument
const generatePDFMonthly = (tickets) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = [
    'Id',
    'Client',
    'WHouse',
    'Quantity',
    'CP',
    'SP',
    'Status',
    'Brand',
    'Profile',
    'Vehicle',
    // 'Category',
    'Sold on'
  ];
  // define an empty array of rows
  const tableRows = [];

  // const customer = '';
  // const worker = '';
  // for each ticket pass all its data into an array
  tickets.forEach((ticket) => {
    console.log('tickets' + ticket.brand_name);
    // customer = ticket.customer_name;
    // worker = ticket.warehouse;
    const ticketData = [
      ticket.sales_id,
      ticket.customer_name,
      ticket.warehouse,
      ticket.quantity,
      ticket.price,
      ticket.sales_price,
      ticket.sales_status ? 'Validated' : 'Pending',
      ticket.brand_name,
      ticket.profile_name,
      ticket.vehicle_name,
      // ticket.category,
      ticket.created_on,
      // called date-fns to format the date on the ticket
      format(new Date(ticket.created_on), 'yyyy-MM-dd')
    ];
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(' ');
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text('Report for the last 30 days.', 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDFMonthly;
