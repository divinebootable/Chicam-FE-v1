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
import api from '../../../../services';
import axios from 'axios';
import { date } from 'yup/lib/locale';
import generatePDF from './reportGenerator';
import SalesTickets from './salesTickets';

const path = require('path');

class SalesWeekly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      tickets: []
    };
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
        // this.showAllSales();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    // showAllSales = () => {
    // const users = localStorage.getItem('auth');
    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + AUTH_TOKEN,
    //     }
    // };
    axios.get(api.WEEKLYREPORT).then((res) => {
      console.log(res);
      this.setState({ sales: res.data });
    });
    // };
  }

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
          <MDBIcon icon="check" className=" green-text mr-3 ml-auto" size="1x" />
        ),
        Brand: sale.brand_name,
        Category: sale.category,
        Profile: sale.profile_name,
        Vehicle: sale.vehicle_name,
        Timestamp: created[0],
        Action: (
          <>
            {/* <Col>
              {' '}
              <UpdateProduct products={product} renderProduct={this.onRenderProduct} />
            </Col> */}
            {/* <Col>
              {' '}
              <MDBIcon
                icon="trash-alt"
                onClick={() => this.submit(product)}
                size="1x"
                className=" red-text mr-3 ml-auto"
              />
            </Col> */}
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
          label: 'Customer',
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
          label: 'Quantity',
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
        {
          label: 'Category',
          field: 'Category',
          sort: 'asc',
          width: 75,
          height: 50
        },
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
          label: 'Timestamp',
          field: 'Timestamp',
          sort: 'asc',
          width: 75,
          height: 50
        }
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
        // {
        //   label: 'Action',
        //   field: 'Action',
        //   sort: 'asc',
        //   width: 75,
        //   height: 50
        // }
      ],
      rows: Sales
    };
    return (
      <div className="animated fadeIn">
        <button className="btn btn-primary" onClick={() => generatePDF(reportTickets)}>
          Generate report
        </button>
        <Col>
          <NotificationContainer />
          {/* <CardHeader>
              <i className="fa fa-suitcase"></i> Products
            </CardHeader> */}
          <div className="container-fluid" style={{ width: '100%', fontSize: '10px' }}>
            <MDBDataTable
              small
              scrollY
              fontSize="2px"
              data={data}
              responsive
              bordered
              hover
              className="your-custom-styles"
            />
          </div>
        </Col>
        <SalesTickets tickets={this.state.sales} />
      </div>
    );
  }
}

export default SalesWeekly;
