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

const path = require('path');

class AllPayments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: []
    };
    this.showAllPayments();
  }

  showAllPayments = () => {
    const users = localStorage.getItem('auth');
    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + AUTH_TOKEN,
    //     }
    // };
    axios
      .get(api.ALLPAYMENTS)
      .then((res) => {
        console.log('sales by id' + res);
        this.setState({ payments: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // onRenderProduct = (value) => {
  //   this.setState({
  //     products: value
  //   });
  //   this.showAllProducts();
  // };
  render() {
    const Payments = (this.state.sales || []).map((payment, index) => {
      const time = payment.created_on; // get only date
      const created = time.split('T'); // get only date
      return {
        ID: payment.payment_id,
        Customer: payment.customer_name,
        Phone: payment.customer_phone,
        Amount_Paid: payment.amount_paid,
        SP: payment.sales_price,
        Status:
          payment.salesprice === payment.amount_paid ? (
            <MDBIcon icon="check" className=" green-text mr-3 ml-auto" size="1x" />
          ) : (
            <MDBIcon icon="spinner" className=" red-text mr-3 ml-auto" size="1x" />
          ),
        Pending_Amount: parseInt(payment.sales_price) - parseInt(payment.amount_paid),
        Date: created[0],
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

            <Col>
              <MDBIcon icon="print" size="1x" className=" green-text mr-3 ml-auto" />
            </Col>
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
          width: 45,
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
          label: 'Phone',
          field: 'Phone',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Amount Paid',
          field: 'Amount_Paid',
          sort: 'asc',
          width: 75,
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
          label: 'Status',
          field: 'Status',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Pending Amount',
          field: 'Pending_Amount',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Date',
          field: 'Date',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Action',
          field: 'Action',
          sort: 'asc',
          width: 75,
          height: 50
        }
      ],
      rows: Payments
    };
    return (
      <div className="animated fadeIn">
        {/* <Col sm xs="12" className=" mt-3 mb-3">
          <AddVehicle renderVehicle={this.onRenderVehicle} />
        </Col> */}
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
      </div>
    );
  }
}

export default AllPayments;
