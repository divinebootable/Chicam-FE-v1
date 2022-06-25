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
import ProductDetails from './productDetails';
// import UpdateProduct from './updateProduct';

const path = require('path');

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.showAllProducts();
  }

  showAllProducts = () => {
    axios.get(api.TOTALPRODUCTSPERWAREHOUSE).then((res) => {
      console.log(res.data.rows);
      this.setState({ products: res.data.rows });
    });
  };
  //   onRenderProduct = (value) => {
  //     this.setState({
  //       products: value
  //     });
  //     this.showAllProducts();
  //   };
  render() {
    const Products = (this.state.products || []).map((product, index) => {
      //   const url = product.filepath;
      //   const filename = path.basename(url); // get file name
      //   const time = product.created_on; // get only date
      //   const created = time.split('T'); // get only date
      return {
        POS: product.warehouse,
        Total_Number_Of_Products: product.sum,
        Action: (
          <>
            <Col>
              <MDBIcon icon="eye" size="1x" className=" green-text mr-3 ml-auto" />
            </Col>
          </>
        )
      };
    });

    const data = {
      columns: [
        {
          label: 'POS',
          field: 'POS',
          sort: 'asc',
          width: 45,
          height: 50
        },
        {
          label: 'Total number of products',
          field: 'Total_Number_Of_Products',
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
      rows: Products
    };
    return (
      <div>
        <Col>
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
        </Col>
        <div style={{ height: '60%' }}>
          <Col>
            <ProductDetails />
          </Col>
        </div>
      </div>
    );
  }
}

export default Product;
