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
import api from '../../services';
import axios from 'axios';

const path = require('path');

class SalesBYId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: []
    };
    this.showAllSales();
  }

  print = () => {};

  showAllSales = () => {
    const users = localStorage.getItem('auth');
    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + AUTH_TOKEN,
    //     }
    // };
    axios.get(api.ALLSALESBYID + `/${users}`).then((res) => {
      console.log(res);
      this.setState({ sales: res.data });
    });
  };
  // onRenderProduct = (value) => {
  //   this.setState({
  //     products: value
  //   });
  //   this.showAllProducts();
  // };
  render() {
    const Sales = (this.state.sales || []).map((sale, index) => {
      const time = sale.created_on; // get only date
      const created = time.split('T'); // get only date
      return {
        Customer: sale.customer_name,
        Phone: sale.customer_phone,
        Address: sale.customer_address,
        Quantity: sale.quantity,
        Status: !sale.sales_status ? (
          <MDBIcon icon="spinner" className=" red-text mr-3 ml-auto" size="1x" />
        ) : (
          <MDBIcon icon="check" className=" green-text mr-3 ml-auto" size="1x" />
        ),
        Product: sale.product_id,
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

            <Col>
              <MDBIcon
                icon="print"
                size="1x"
                onClick={this.print(sale)}
                className=" green-text mr-3 ml-auto"
              />
            </Col>
          </>
        )
      };
    });

    const data = {
      columns: [
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
          label: 'Address',
          field: 'Address',
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
          label: 'Product',
          field: 'Product',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Timestamp',
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

export default SalesBYId;
