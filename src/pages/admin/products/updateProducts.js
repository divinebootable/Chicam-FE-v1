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
import {
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';

const mystyle = {
  height: '30px',
  fontSize: '.70rem'
};

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      id: this.props.products.product_id,
      size: this.props.products.size,
      price: this.props.products.price,
      quantity: this.props.products.quantity,
      category: this.props.products.category,
      brand: this.props.products.brand_name,
      profile: this.props.products.profile_name,
      vehicle: this.props.products.vehicle_name,
      account: this.props.products.warehouse,
      sampleFile: this.props.products.filepath,
      categories: [],
      brands: [],
      profiles: [],
      vehicles: [],
      accounts: [],
      selectedFile: null
    };

    this.toggle = this.toggle.bind(this);
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
    getBrands().then((res) => {
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
    });
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
      modal: !this.state.modal
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const content = new FormData();
    content.append('product_id', this.state.id);
    content.append('size', this.state.size);
    content.append('price', this.state.price);
    content.append('quantity', this.state.quantity);
    content.append('category', this.state.category);
    content.set('users', this.state.account);
    content.append('brand', this.state.brand);
    content.append('profile', this.state.profile);
    content.append('vehicle', this.state.vehicle);
    content.append('sampleFile', this.state.selectedFile, this.state.selectedFile.name || '');
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };
    for (let value of content) {
      console.log(value);
    }

    // axios
    //   .post(api.ADDPRODUCT, content)
    //   .then((res) => {
    //     this.setState({
    //       size: '',
    //       price: '',
    //       quantity: '',
    //       category: '',
    //       users: '',
    //       brand: '',
    //       profile: '',
    //       vehicle: '',
    //       sampleFile: ''
    //     });
    //     NotificationManager.success('Update!', 'Successful!', 8000);
    //   })
    //   .catch((error) => {
    //     NotificationManager.error(
    //       'Network error!please make sure you are connected.',
    //       'Error!',
    //       8000
    //     );
    //   });
  };

  render() {
    return (
      <div>
        <MDBIcon icon="edit" onClick={this.toggle} size="1x" className="green-text mr-3 ml-auto" />
        <Modal
          isOpen={this.state.modal}
          size="medium"
          dialogclassname="modal-90w"
          toggle={this.toggle}
        >
          <form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.toggle}>Update product</ModalHeader>
            <ModalBody>
              <NotificationContainer />
              <Row form>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleZip">
                      <span style={mystyle}>Size</span>
                    </Label>
                    <Input
                      style={mystyle}
                      placeholder="Size"
                      type="text"
                      value={this.state.size}
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
                      <option value={this.state.brand}>{this.state.brand}</option>
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
                      value={this.state.price}
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
                      value={this.state.quantity}
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
                      <option value={this.state.category}>{this.state.category}</option>
                      {this.state.categories.map((fbb, label) => (
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
                      <option value={this.state.profile}>{this.state.profile}</option>
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
                      <option value={this.state.vehicle}>{this.state.vehicle}</option>
                      {this.state.vehicles.map((fbb, label) => (
                        <option key={label} value={fbb.label}>
                          {fbb.value}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleCity">
                      <span style={mystyle}>Warehouse </span>
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
                      <option value={this.state.account}>{this.state.account}</option>
                      {/* {this.state.accounts.map((fbb, label) => (
                        <option key={label} value={fbb.label}>
                          {fbb.value}
                        </option>
                      ))} */}
                      ;
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="FileUplaod">
                      <span style={mystyle}>Image Upload</span>
                    </Label>
                    <Input
                      style={mystyle}
                      placeholder="File Upload"
                      onChange={this.onFileChange}
                      value={this.state.sampleFile}
                      type="file"
                      name="sampleFile"
                      id="FileUplaod"
                    />
                  </FormGroup>
                </Col>
                <div className="w-100">
                  <hr />
                </div>
              </Row>
            </ModalBody>
            <ModalFooter>
              <div>
                <Button color="primary" value="Submit" type="submit">
                  Update Product
                </Button>
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </div>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default UpdateProduct;
