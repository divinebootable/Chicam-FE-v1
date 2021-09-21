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

const mystyle = {
  height: '30px',
  fontSize: '.70rem'
};

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      expense: '',
      amount: ''
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
      expense: this.state.expense,
      amount: this.state.amount,
      users: userId
    };
    console.log(content);

    axios
      .post(api.ADDEXPENSE, content)
      .then((res) => {
        console.log(res);
        this.props.renderExpense(res.data);
        this.setState({
          modal: false,
          expense: '',
          amount: ''
        });
        NotificationManager.success('You have added a new Category!', 'Successful!', 8000);
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
        <Button color="primary" onClick={this.toggle}>
          <i className="fa fa-plus"></i>&nbsp;Expense
        </Button>
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
                <span>Add Expense</span>
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

export default AddExpense;
