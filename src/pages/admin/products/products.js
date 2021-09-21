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
import ProductDetails from './productDetails.js'
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
  
      return {
        Warehouse: product.warehouse  ,
        Total_number_of_products: product.sum,
        Action: (
          <div>
            <Col>
                <MDBIcon icon="eye" size="1x" className="green-text mr-3 ml-auto" />
            </Col>
          </div>
        )
      };
    });

    const data = {
      columns: [
        {
          label: 'Warehouse',
          field: 'Warehouse',
          sort: 'asc',
          width: 60,
          height: 50
        },
        {
          label: 'Total number of products',
          field: 'Total_number_of_products',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Action  ',
          field: 'Action',
          sort: 'asc',
          width: 50,
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
     <Col>
       <ProductDetails/>
     </Col>

    </div>
    );
  }
}

export default Product;
