import React, { Component } from 'react';
import axios from 'axios';
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
import { MDBIcon } from 'mdbreact';

const mystyle = {
  height: '30px',
  fontSize: '.70rem'
};

class UpdateExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      _id: this.props.expenses.expenses_id,
      expense: this.props.expenses.expense,
      amount: this.props.expenses.amount
    };
    this.toggle = this.toggle.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('auth');
    const content = {
      expenses_id: this.state._id,
      expense: this.state.expense,
      amount: this.state.amount,
      users: userId
    };
    console.log(content);

    axios
      .put(api.UPDATEEXPENSE, content)
      .then((res) => {
        console.log(res);
        this.props.renderExpense(res.data);
        this.setState({
          modal: false,
          expense: '',
          amount: ''
        });
        NotificationManager.success('Update!', 'Successful!', 8000);
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
        <MDBIcon icon="edit" onClick={this.toggle} size="1x" className="green-text mr-3 ml-auto" />
        <Modal
          isOpen={this.state.modal}
          size="medium"
          dialogClassName="modal-90w"
          toggle={this.toggle}
        >
          <form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.toggle}>Expense Details</ModalHeader>
            <ModalBody>
              <NotificationContainer />
              <div className="mb-3">
                <span>Update Expense</span>
              </div>
              <div className="w-100">
                <hr />
              </div>
              <Row form>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleCity">
                      <span style={mystyle}>Expense</span>
                    </Label>
                    <Input
                      style={mystyle}
                      placeholder="Expense"
                      value={this.state.expense}
                      type="text"
                      onChange={this.handleChange}
                      name="expense"
                      id="expense"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleCity">
                      <span style={mystyle}>Amount</span>
                    </Label>
                    <Input
                      style={mystyle}
                      placeholder="Amount"
                      value={this.state.amount}
                      type="text"
                      onChange={this.handleChange}
                      name="amount"
                      id="name"
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" value="Submit" type="submit">
                Save Changes
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

export default UpdateExpense;
