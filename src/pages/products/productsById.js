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

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.showAllProducts();
  }

  showAllProducts = () => {
    const users = localStorage.getItem('auth');
    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + AUTH_TOKEN,
    //     }
    // };
    axios.get(api.ALLPRODUCTBYID + `/${users}`).then((res) => {
      console.log(res);
      this.setState({ vehicles: res.data });
    });
  };
  //   onRenderVehicle = (value) => {
  //     this.setState({
  //       vehicles: value
  //     });
  //     this.showAllVehicles();
  //   };
  render() {
    const Products = (this.state.products || []).map((product, index) => {
      return {
        Category: product.category,
        Brand: product.brand_name,
        Profile: product.profile_name,
        Vehicle: product.vehicle_name,
        Size: product.size,
        Price: product.price,
        Quantity: product.quantity,
        Image: product.filepath,
        Timestamp: product.created_on,
        Action: (
          <div>
            {/* <UpdateVehicle vehicles={vehicle} renderVehicle={this.onRenderVehicle} /> */}
            <MDBIcon
              icon="trash-alt"
              onClick={() => this.submit(product)}
              size="1x"
              className=" red-text mr-3 ml-auto"
            />
          </div>
        )
      };
    });

    const data = {
      columns: [
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
          label: 'Quantity',
          field: 'Quantity',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Image',
          field: 'Image',
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
          <div className="container-fluid" style={{ width: '100%', fontSize: '10px' }}>
            <MDBDataTable
              small
              scrollY
              maxHeight="75px"
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

export default Product;
