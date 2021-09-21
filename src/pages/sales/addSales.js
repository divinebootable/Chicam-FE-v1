import React, { Component } from 'react';
import {
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
import api from '../../services';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import getProducts from '../controller/productController';
// import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

const mystyle = {
  height: '30px',
  fontSize: '.70rem'
};

class AddSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_name: '',
      customer_phone: '',
      customer_address: '',
      quantity: '',
      product: '',
      users: '',
      products: [],
      users: [],
      currentQuantity: []
    };

    this.getAllProducts();
    this.getUser();
  }

  getUser = () => {
    let user_id = localStorage.getItem('auth');
    return user_id;
  };

  getAllProducts = () => {
    getProducts().then((res) => {
      let dataProducts = [];
      let realQuantity;
      if (res.data != null) {
        dataProducts = res.data.map((item) => {
          realQuantity = item.quantity;
          return {
            value:
              item.brand_name +
              '-' +
              item.size +
              '-' +
              item.price +
              '-' +
              item.quantity +
              '-' +
              item.category +
              '-' +
              item.profile_name +
              '-' +
              item.vehicle_name,
            label: item.product_id
          };
        });
      }
      this.setState({
        products: dataProducts,
        currentQuantity: realQuantity
      });
      console.log(this.state.products);
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    let users = this.getUser();
    e.preventDefault();
    const content = {
      customer_name: this.state.customer_name,
      customer_phone: this.state.customer_phone,
      users: users,
      customer_address: this.state.customer_address,
      quantity: this.state.quantity,
      product: this.state.product
    };

    if (parseInt(content.quantity) <= parseInt(this.state.currentQuantity)) {
      axios
        .post(api.ADDSALES, content)
        .then((res) => {
          this.setState({
            customer_name: '',
            customer_phone: '',
            customer_address: '',
            quantity: '',
            product: '',
            users: ''
          });
          NotificationManager.success('New Sales added!', 'Successful!', 8000);
        })
        .catch((error) => {
          NotificationManager.error(
            'Network error!please make sure you are connected.',
            'Error!',
            8000
          );
        });
    } else {
      alert('Insufficient products');
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <NotificationContainer />
          <div className="mb-3">
            <span>Make Sales</span>
          </div>

          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleZip">
                  <span style={mystyle}>Customer Name</span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="Customer Name"
                  type="text"
                  onChange={this.handleChange}
                  name="customer_name"
                  id="size"
                  required
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleCity">
                  <span style={mystyle}>Customer Phone</span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="Customer Phone"
                  type="text"
                  onChange={this.handleChange}
                  name="customer_phone"
                  id="brand"
                  required
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleZip">
                  <span style={mystyle}>Customer Address</span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="Customer Address"
                  type="text"
                  onChange={this.handleChange}
                  name="customer_address"
                  id="price"
                  required
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleZip">
                  <span style={mystyle}>quantity</span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="Quantity"
                  type="number"
                  onChange={this.handleChange}
                  name="quantity"
                  id="quantity"
                  required
                />
              </FormGroup>
            </Col>
            <div className="w-100">
              <hr />
            </div>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleCity">
                  <span style={mystyle}>product</span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="Product"
                  type="select"
                  onChange={this.handleChange}
                  name="product"
                  id="product"
                  required
                >
                  <option>Select Product</option>
                  {this.state.products.map((fbb, label) => (
                    <option key={label} value={fbb.label}>
                      {fbb.value}
                    </option>
                  ))}
                  ;
                </Input>
              </FormGroup>
            </Col>

            <div className="w-100">
              <hr />
            </div>
          </Row>
          <Row form></Row>

          <div>
            <Button color="primary" value="Submit" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddSales;
