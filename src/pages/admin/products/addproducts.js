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
import api from '../../../services';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import getBrands from '../../controller/brandController';
import getCategories from '../../controller/categoryController';
import getProfiles from '../../controller/profileController';
import getVehicles from '../../controller/vehicleController';
// import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

const mystyle = {
  height: '30px',
  fontSize: '.70rem'
};

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      product_name: '',
      code: '',
      size: '',
      price: '',
      quantity: '',
      category: '',
      brand: '',
      account: '',
      profile: '',
      vehicle: '',
      sampleFile: '',
      categories: [],
      brands: [],
      profiles: [],
      vehicles: [],
      accounts: [],
      selectedFile: null
    };

    // this.toggle = this.toggle.bind(this);
    this.getAllBrands();
    this.getAllProfiles();
    this.getAllCtegories();
    this.getAllVehicles();
    this.showAllAccounts();
  }

  showAllAccounts = () => {
    axios
      .get(api.ALLUSERS)
      .then((res) => {
        let dataAccounts = [];
        if (res.data != null) {
          dataAccounts = res.data.map((item) => {
            return { value: item.warehouse, label: item.users_id };
          });
        }
        this.setState({ accounts: dataAccounts });
      })
      .catch((err) => console.log(err));
  };

  getAllBrands = () => {
    getBrands()
      .then((res) => {
        let dataBrands = [];
        if (res.data != null) {
          dataBrands = res.data.map((item) => {
            return { value: item.brand_name, label: item.brand_id };
          });
        }
        this.setState({
          brands: dataBrands
        });
        console.log(this.state.brands);
      })
      .catch((err) => console.log(err));
  };

  getAllCtegories = () => {
    getCategories().then((res) => {
      let dataCategories = [];
      if (res.data != null) {
        dataCategories = res.data.map((item) => {
          return { value: item.category, label: item.category_id };
        });
      }
      this.setState({
        categories: dataCategories
      });
    });
  };

  getAllProfiles = () => {
    getProfiles().then((res) => {
      let dataProfiles = [];
      if (res.data != null) {
        dataProfiles = res.data.map((item) => {
          return { value: item.profile_name, label: item.profile_id };
        });
      }
      this.setState({
        profiles: dataProfiles
      });
    });
  };

  getAllVehicles = () => {
    getVehicles().then((res) => {
      let dataVehicles = [];
      if (res.data != null) {
        dataVehicles = res.data.map((item) => {
          return { value: item.vehicle_name, label: item.vehicle_id };
        });
      }
      this.setState({
        vehicles: dataVehicles
      });
    });
  };

  // getUser = () => {
  //   console.log('mount');
  //   let user_id = localStorage.getItem('auth');
  //   this.setState({
  //     users: user_id
  //   });
  // };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  toggle() {
    this.setState({
      product_name: '',
      code: '',
      size: '',
      price: '',
      quantity: '',
      category: '',
      brand: '',
      account: '',
      profile: '',
      vehicle: '',
      sampleFile: ''
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const content = new FormData();
    content.append('product_name', this.state.product_name);
    content.append('code', this.state.code);
    content.append('size', this.state.size);
    content.append('price', this.state.price);
    content.append('quantity', this.state.quantity);
    content.append('category', this.state.category);
    content.append('users', this.state.account);
    content.append('brand', this.state.brand);
    // content.append('profile', this.state.profile);
    // content.append('vehicle', this.state.vehicle);
    // content.append('sampleFile', this.state.selectedFile, this.state.selectedFile.name);
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };
    axios
      .post(api.ADDPRODUCT, content)
      .then((res) => {
        if (res.status === 200) {
          NotificationManager.success('New Product added!', 'Successful!', 8000);
        }
      })
      .catch((error) => {
        NotificationManager.error(
          'Network error!please make sure you are connected.',
          'Error!',
          8000
        );
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <NotificationContainer />
          <div className="mb-3">
            <span>Add product</span>
          </div>

          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleZip">
                  <span style={mystyle}>Product Name</span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="Name"
                  type="text"
                  onChange={this.handleChange}
                  name="product_name"
                  id="product name"
                  required
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleZip">
                  <span style={mystyle}>Product Code</span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="Code"
                  type="text"
                  onChange={this.handleChange}
                  name="code"
                  id="code"
                  required
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleZip">
                  <span style={mystyle}>Size</span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="Size"
                  type="text"
                  onChange={this.handleChange}
                  name="size"
                  id="size"
                  required
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleCity">
                  <span style={mystyle}>Brand </span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="Brand"
                  type="select"
                  onChange={this.handleChange}
                  name="brand"
                  id="brand"
                  required
                >
                  <option>select brand</option>
                  {this.state.brands.map((fbb, label) => (
                    <option key={label} value={fbb.label}>
                      {fbb.value}
                    </option>
                  ))}
                  ;
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleZip">
                  <span style={mystyle}>Price</span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="Price"
                  type="text"
                  onChange={this.handleChange}
                  name="price"
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
                <Label for="exampleZip">
                  <span style={mystyle}>Category</span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="Category"
                  type="select"
                  onChange={this.handleChange}
                  name="category"
                  id="category"
                  required
                >
                  <option>Select Category</option>
                  {this.state.categories.map((fbb, label) => (
                    <option key={label} value={fbb.label}>
                      {fbb.value}
                    </option>
                  ))}
                  ;
                </Input>
              </FormGroup>
            </Col>
            {/* <Col md={3}>
              <FormGroup>
                <Label for="exampleZip">
                  <span style={mystyle}>Profile</span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="Profile"
                  type="select"
                  onChange={this.handleChange}
                  name="profile"
                  id="profile"
                  required
                >
                  <option>Select Profile</option>
                  {this.state.profiles.map((fbb, label) => (
                    <option key={label} value={fbb.label}>
                      {fbb.value}
                    </option>
                  ))}
                  ;
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleZip">
                  <span style={mystyle}>Vehicle</span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="Vehicle"
                  type="select"
                  onChange={this.handleChange}
                  name="vehicle"
                  id="vehicle"
                  required
                >
                  <option>Select Vehicle</option>
                  {this.state.vehicles.map((fbb, label) => (
                    <option key={label} value={fbb.label}>
                      {fbb.value}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col> */}
            <Col md={3}>
              <FormGroup>
                <Label for="exampleCity">
                  <span style={mystyle}>POS </span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="Warehouse"
                  type="select"
                  onChange={this.handleChange}
                  name="account"
                  id="account"
                  required
                >
                  <option>select warehouse</option>
                  {this.state.accounts.map((fbb, label) => (
                    <option key={label} value={fbb.label}>
                      {fbb.value}
                    </option>
                  ))}
                  ;
                </Input>
              </FormGroup>
            </Col>
            {/* <Col md={2}>
              <FormGroup>
                <Label for="FileUplaod">
                  <span style={mystyle}>Image Upload</span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="File Upload"
                  onChange={this.onFileChange}
                  type="file"
                  name="sampleFile"
                  id="FileUplaod"
                />
              </FormGroup>
            </Col> */}
            <div className="w-100">
              <hr />
            </div>
          </Row>
          <Row form></Row>

          <div>
            <Button color="primary" value="Submit" type="submit">
              Save Product
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddProduct;
