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
import UpdateProducts from './updateProducts';
import axios from 'axios';

const path = require('path');

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.showAllProducts();
  }

  showAllProducts = () => {
    axios.get(api.ALLPRODUCT).then((res) => {
      console.log(res);
      this.setState({ products: res.data });
    });
  };
  onRenderProduct = (value) => {
    this.setState({
      products: value
    });
    this.showAllProducts();
  };
  render() {
    const Products = (this.state.products || []).map((product, index) => {
      console.log('product: ' + product.filepath);
      const url = product.filepath;
      const filename = path.basename(url); // get file name
      const time = product.created_on; // get only date
      const created = time.split('T'); // get only date
      return {
        //ID: product.product_id,
        Warehouse: product.warehouse,
        Name: product.product_name,
        Code: product.code,
        Category: product.category,
        Brand: product.brand_name,
        Profile: product.profile_name,
        Vehicle: product.vehicle_name,
        Size: product.size,
        Price: product.price,
        Quantity: product.quantity,
        Timestamp: created[0],
        Action: (
          <div>
            <Col>
              {' '}
              <UpdateProducts products={product} renderProduct={this.onRenderProduct} />
            </Col>
            <Col>
              {' '}
              <MDBIcon
                icon="trash-alt"
                onClick={() => this.submit(product)}
                size="1x"
                className=" red-text mr-3 ml-auto"
              />
            </Col>
            <Col>
              <a
                aria-hidden="true"
                role="button"
                href={
                  'file://localhost/home/divine/Documents/Chicam/CHICAM.V1.0/uploads/' + filename
                }
                target="_blank"
                rel="noreferrer"
              >
                <MDBIcon icon="eye" size="1x" className=" green-text mr-3 ml-auto" />
              </a>
            </Col>
          </div>
        )
      };
    });

    const data = {
      columns: [
        {
          label: 'Name',
          field: 'Name',
          sort: 'asc',
          width: 45,
          height: 50
        },
        {
          label: 'Code',
          field: 'Code',
          sort: 'asc',
          width: 45,
          height: 50
        },
        {
          label: 'Warehouse',
          field: 'Warehouse',
          sort: 'asc',
          width: 45,
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
          label: 'Brand',
          field: 'Brand',
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
        {
          label: 'Size',
          field: 'Size',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Price',
          field: 'Price',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Qtty',
          field: 'Quantity',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Time',
          field: 'Timestamp',
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
      <div className="animated fadeIn">
        {/* <Col sm xs="12" className=" mt-3 mb-3">
          <AddVehicle renderVehicle={this.onRenderVehicle} />
        </Col> */}
        <Col>
          <NotificationContainer />
          {/* <CardHeader>
              <i className="fa fa-suitcase"></i> Products
            </CardHeader> */}
          <div
            className="container-fluid"
            style={{ width: '100%', height: '60%', fontSize: '10px' }}
          >
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

export default ProductDetails;
