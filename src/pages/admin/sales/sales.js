import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { MDBDataTable, MDBIcon } from 'mdbreact';
import {
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardBody from 'reactstrap/lib/CardBody';
import { NotificationManager } from 'react-notifications';
import api from '../../../services';
import axios from 'axios';
import { date } from 'yup/lib/locale';
import generatePDF from '../../controller/reportSalesGenerator';
import generateTablePDF from '../../controller/reportSalesTableGenerator';
import generatePDFMonthly from './monthlyReport/reportGenerator';
import generatePDFWeekly from './weeklyReport/reportGenerator';
import generatePDFDaily from './dialyReport/reportGenerator';
import SalesTickets from './salesTickets';
import SalesPerWarehouse from './salesPerWarehouse';

const path = require('path');

class SalesMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      reportMonthly: [],
      weeklySales: [],
      dailySales: [],
      tickets: []
    };
    this.showAllSales();
    this.monthlySalesReport();
    this.weeklySalesReport();
    this.dailysalesReport();
  }

  validateSales = (value) => {
    const content = {
      sales_id: value.sales_id,
      product: value.product_id,
      quantity: parseInt(value.quantity)
    };
    console.log(content);
    axios
      .put(api.VALIDATESALES, content)
      .then((res) => {
        console.log(res);
        this.showAllSales();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showAllSales = () => {
    // const users = localStorage.getItem('auth');
    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + AUTH_TOKEN,
    //     }
    // };
    axios.get(api.ALLSALES).then((res) => {
      this.setState({ sales: res.data });
    });
  };

  monthlySalesReport = () => {
    axios
      .get(api.MONTHLYREPORT)
      .then((res) => {
        console.log('monthly' + res.data.rows);
        this.setState({ reportMonthly: res.data.rows });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  weeklySalesReport = () => {
    axios
      .get(api.WEEKLYREPORT)
      .then((res) => {
        console.log(res);
        this.setState({ weeklySales: res.data.rows });
      })
      .catch((error) => {
        console.log(error);
      });
    // };
  };

  dailysalesReport = () => {
    axios.get(api.DAILYREPORT).then((res) => {
      console.log(res);
      this.setState({ dailySales: res.data.rows });
    });
    // };
  };

  // getAllSalesOnPdf = (tickets) => {
  //   this.setState({
  //     tickets: value
  //   });
  //   generatePDF(tickets);
  // };
  // onRenderProduct = (value) => {
  //   this.setState({
  //     products: value
  //   });
  //   this.showAllProducts();
  // };
  render() {
    const reportTicketsDaily = this.state.dailySales.filter((value) => value.sales_status === true);
    const reportTicketsWeekly = this.state.weeklySales.filter(
      (value) => value.sales_status === true
    );
    const reportTicketsMonthly = this.state.reportMonthly.filter(
      (value) => value.sales_status === true
    );
    const reportTickets = this.state.sales.filter((value) => value.sales_status === true);
    const Sales = (this.state.sales || []).map((sale, index) => {
      var currentdate = new Date();
      console.log(currentdate, sale.created_on);
      const time = sale.created_on; // get only date
      const created = time.split('T'); // get only date
      return {
        ID: sale.sales_id,
        Customer: sale.customer_name,
        SP: sale.sales_price,
        CP: sale.price,
        Quantity: sale.quantity,
        Status: !sale.sales_status ? (
          <MDBIcon
            icon="spinner"
            onClick={() => this.validateSales(sale)}
            className=" red-text mr-3 ml-auto"
            size="1x"
          />
        ) : (
          <span style={{ backgroundColor: '#2F9169', color: '#FFFFFF' }}>
            <b>Validated</b>
          </span>
        ),
        Brand: sale.brand_name,
        // Category: sale.category,
        Profile: sale.profile_name,
        Vehicle: sale.vehicle_name,
        Timestamp: created[0],
        Action: (
          <>
            {/* <Col>
              {' '}
              <UpdateProduct products={product} renderProduct={this.onRenderProduct} />
            </Col> */}
            <Col>
              {' '}
              <MDBIcon
                icon="print"
                onClick={() => generateTablePDF(sale)}
                size="1x"
                className=" red-text mr-3 ml-auto"
              />
            </Col>
            {/* 
            <Col>
              <MDBIcon
                icon="print"
                onClick={() => this.getAllSalesOnPdf(reportTickets)}
                size="1x"
                className=" green-text mr-3 ml-auto"
              />
            </Col> */}
          </>
        )
      };
    });

    const data = {
      columns: [
        {
          label: 'ID',
          field: 'ID',
          sort: 'asc',
          width: 30,
          height: 50
        },
        {
          label: 'Client',
          field: 'Customer',
          sort: 'asc',
          width: 45,
          height: 50
        },
        {
          label: 'SP',
          field: 'SP',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'CP',
          field: 'CP',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Qty',
          field: 'Quantity',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Status',
          field: 'Status',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Brand',
          field: 'Brand',
          sort: 'asc',
          width: 75,
          height: 50
        },
        // {
        //   label: 'Cat',
        //   field: 'Category',
        //   sort: 'asc',
        //   width: 75,
        //   height: 50
        // },
        {
          label: 'Profile',
          field: 'Profile',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Vehicle',
          field: 'Vehicle',
          sort: 'asc',
          width: 75,
          height: 50
        },
        // {
        //   label: 'Product',
        //   field: 'Product',
        //   sort: 'asc',
        //   width: 75,
        //   height: 50
        // },
        {
          label: 'SoldOn',
          field: 'Timestamp',
          sort: 'asc',
          width: 75,
          height: 50
        },
        // {
        //   label: 'Quantity',
        //   field: 'Quantity',
        //   sort: 'asc',
        //   width: 75,
        //   height: 50
        // },
        // {
        //   label: 'Timestamp',
        //   field: 'Timestamp',
        //   sort: 'asc',
        //   width: 75,
        //   height: 50
        // },
        {
          label: 'Action',
          field: 'Action',
          sort: 'asc',
          width: 75,
          height: 50
        }
      ],
      rows: Sales
    };
    return (
      <div className="animated fadeIn">
        <div>
          <Row>
            <button className="btn btn-primary" onClick={() => generatePDF(reportTickets)}>
              Generate report
            </button>
            <button
              className="btn btn-primary"
              onClick={() => generatePDFMonthly(reportTicketsMonthly)}
            >
              Last 30 days report
            </button>
            <button
              className="btn btn-primary"
              onClick={() => generatePDFWeekly(reportTicketsWeekly)}
            >
              Last 7 days report
            </button>
            <button
              className="btn btn-primary"
              onClick={() => generatePDFDaily(reportTicketsDaily)}
            >
              Last 24 hours report
            </button>
          </Row>
        </div>
        <Col>
          <SalesPerWarehouse />
          <NotificationContainer />
          {/* <CardHeader>
              <i className="fa fa-suitcase"></i> Products
            </CardHeader> */}
          <div className="container-fluid" style={{ width: 'auto', fontSize: '10px' }}>
            <MDBDataTable
              small
              scrollY
              fontSize="2px"
              width="100%"
              data={data}
              responsive
              bordered
              hover
              className="your-custom-styles"
            />
          </div>
        </Col>
        {/* <SalesTickets tickets={this.state.sales} /> */}
      </div>
    );
  }
}

export default SalesMain;
