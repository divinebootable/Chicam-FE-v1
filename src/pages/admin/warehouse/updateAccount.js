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
import { MDBIcon } from 'mdbreact';
import api from '../../../services';

const mystyle = {
  height: '30px',
  fontSize: '.70rem'
};

class UpdateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      _id: this.props.accounts.users_id,
      username: '',
      current_username: this.props.accounts.username,
      password: '',
      confirmpassword: '',
      role: this.props.accounts.role
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
      users: userId,
      username: this.state.username,
      current_username: this.state.current_username,
      password: this.state.password,
      role: this.state.role
    };
    console.log(content);

    axios
      .put(api.UPDATEACCOUNT, content)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.props.renderAccounts(res.data);
          NotificationManager.success('You have added a new Account!', 'Successful!', 8000);
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
        <MDBIcon icon="edit" onClick={this.toggle} size="1x" className="green-text mr-3 ml-auto" />{' '}
        <Modal
          isOpen={this.state.modal}
          size="medium"
          dialogclassname="modal-90w"
          toggle={this.toggle}
        >
          <form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.toggle}>Expense Details</ModalHeader>
            <ModalBody>
              <NotificationContainer />
              <div className="mb-3">
                <span>Add Warehouse</span>
              </div>
              <div className="w-100">
                <hr />
              </div>
              <Row form>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleCity">
                      <span style={mystyle}>Username</span>
                    </Label>
                    <Input
                      style={mystyle}
                      placeholder="Username"
                      type="text"
                      onChange={this.handleChange}
                      name="username"
                      id="username"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleCity">
                      <span style={mystyle}>Current Username</span>
                    </Label>
                    <Input
                      style={mystyle}
                      placeholder="Current username"
                      type="text"
                      value={this.state.current_username}
                      onChange={this.handleChange}
                      name="current_username"
                      id="current_username"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleCity">
                      <span style={mystyle}>Password</span>
                    </Label>
                    <Input
                      style={mystyle}
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                      name="password"
                      id="password"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleCity">
                      <span style={mystyle}>Confirm Password</span>
                    </Label>
                    <Input
                      style={mystyle}
                      placeholder="Confirm Password"
                      type="password"
                      onChange={this.handleChange}
                      name="confirmpassword"
                      id="confirmpassword"
                      required
                    />
                  </FormGroup>
                </Col>
                {/* <Col md={3}>
                  <FormGroup>
                    <Label for="exampleCity">
                      <span style={mystyle}>Warehouse</span>
                    </Label>
                    <Input
                      style={mystyle}
                      placeholder="Warehouse"
                      type="text"
                      onChange={this.handleChange}
                      name="warehouse"
                      id="warehouse"
                      required
                    />
                  </FormGroup>
                </Col> */}
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleCity">
                      <span style={mystyle}>Role</span>
                    </Label>
                    <Input
                      style={mystyle}
                      placeholder="Role"
                      type="select"
                      value={this.state.role}
                      onChange={this.handleChange}
                      name="role"
                      id="role"
                      required
                    >
                      <option>admin</option>
                      <option>user</option>
                    </Input>
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

export default UpdateAccount;
