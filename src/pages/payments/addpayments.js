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
import getSales from '../controller/paymentsController';
// import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const mystyle = {
  height: '30px',
  fontSize: '.70rem'
};

class AddPayments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount_paid: '',
      pending_amount: '',
      sales: '',
      sale: []
    };

    this.getAllSales();
    this.getUser();
  }

  getUser = () => {
    let user_id = localStorage.getItem('auth');
    return user_id;
  };

  getAllSales = () => {
    getSales().then((res) => {
      let dataSales = [];
      if (res.data != null) {
        dataSales = res.data.map((item) => {
          const time = item.created_on; // get only date
          const created = time.split('T'); // get only date
          return {
            value:
              item.customer_name +
              '-' +
              item.customer_phone +
              '-' +
              item.sales_price +
              '-' +
              created +
              '-' +
              item.brand_name +
              '-' +
              item.profile_name +
              '-' +
              item.vehicle_name,
            label: item.sales_id
          };
        });
      }
      this.setState({
        sale: dataSales
      });
      console.log(this.state.sales);
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  r;
  handleSubmit = (e) => {
    let users = this.getUser();
    e.preventDefault();
    const content = {
      amount_paid: this.state.amount_paid,
      pending_amount: this.state.pending_amount,
      users: parseInt(users),
      sales: this.state.sales
    };
    axios
      .post(api.ADDPAYMENT, content)
      .then((res) => {
        if (res.status === 200) {
          NotificationManager.success('New Sales added!', 'Successful!', 8000);
        }
      })
      .catch((error) => {
        NotificationManager.console.error();
        'Network Error!', 'Error!', 8000;
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <NotificationContainer />
          <div className="mb-3">
            <span>Make Payments</span>
          </div>

          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleZip">
                  <span style={mystyle}>Amount Paid</span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="Amount Paid"
                  type="number"
                  onChange={this.handleChange}
                  name="amount_paid"
                  id="size"
                  required
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleCity">
                  <span style={mystyle}>Pending Amount</span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="Pending"
                  type="text"
                  onChange={this.handleChange}
                  name="pending_amount"
                  id="pendingAmount"
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
                  <span style={mystyle}>Sales</span>
                </Label>
                <Input
                  style={mystyle}
                  placeholder="Sales"
                  type="select"
                  onChange={this.handleChange}
                  name="sale"
                  id="sale"
                  required
                >
                  <option>Select Sales</option>
                  {this.state.sales.map((fbb, label) => (
                    <option key={label} value={fbb.label}>
                      {fbb.value}
                    </option>
                  ))}
                  ;
                </Input>
              </FormGroup>
            </Col>
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

export default AddPayments;
