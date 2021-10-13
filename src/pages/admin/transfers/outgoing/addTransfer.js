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
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import api from '../../../services';
import getProducts from '../../controller/productController';
import getUsers from '../../controller/userController';
import axios from 'axios';

const mystyle = {
  height: '30px',
  fontSize: '.70rem'
};

class AddTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      quantity: '',
      product: '',
      transfer_from: '',
      transfer_to: '',
      products: [],
      currentQuantity: '',
      users: []
    };
    this.toggle = this.toggle.bind(this);
    this.getAllProducts();
    this.getAllUsers();
  }

  getAllUsers = () => {
    getUsers().then((res) => {
      let dataWarehouses = [];
      if (res.data != null) {
        dataWarehouses = res.data.map((item) => {
          return { value: item.warehouse, label: item.users_id };
        });
      }
      this.setState({
        users: dataWarehouses
      });
    });
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

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit = (e) => {
    let user_id = localStorage.getItem('auth');
    e.preventDefault();
    const content = {
      quantity: this.state.quantity,
      product: this.state.product,
      transfer_from: user_id,
      transfer_to: this.state.transfer_to
    };
    console.log(content.quantity);
    if (parseInt(content.quantity) <= parseInt(this.state.currentQuantity)) {
      axios
        .post(api.ADDTRANSFER, content)
        .then((res) => {
          console.log(res);
          this.props.transfer(res.data);
          this.setState({
            modal: false,
            quantity: '',
            product: '',
            transfer_from: '',
            transfer_to: ''
          });
          NotificationManager.success('You have added a new Transfer', 'Successful!', 8000);
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
        <Button color="primary" onClick={this.toggle}>
          <i className="fa fa-plus"></i>&nbsp;Transfers
        </Button>
        <Modal
          isOpen={this.state.modal}
          size="medium"
          dialogclassName="modal-90w"
          toggle={this.toggle}
        >
          <form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.toggle}>Transfer Details</ModalHeader>
            <ModalBody>
              <NotificationContainer />
              <div className="mb-3">
                <span>Add Transfer</span>
              </div>
              <div className="w-100">
                <hr />
              </div>
              <Row form>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleCity">
                      <span style={mystyle}>quantity</span>
                    </Label>
                    <Input
                      style={mystyle}
                      placeholder="Quantity"
                      type="text"
                      onChange={this.handleChange}
                      name="quantity"
                      id="quantity"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col>
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
                <Col>
                  <FormGroup>
                    <Label for="exampleCity">
                      <span style={mystyle}>Transfer To</span>
                    </Label>
                    <Input
                      style={mystyle}
                      placeholder="Product"
                      type="select"
                      onChange={this.handleChange}
                      name="transfer_to"
                      id="transfer_to"
                      required
                    >
                      <option>Select Warehouse</option>
                      {this.state.users.map((fbb, label) => (
                        <option key={label} value={fbb.label}>
                          {fbb.value}
                        </option>
                      ))}
                      ;
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" value="Submit" type="submit">
                Save
              </Button>
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default AddTransfer;
