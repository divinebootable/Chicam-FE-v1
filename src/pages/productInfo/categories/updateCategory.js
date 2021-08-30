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

class UpdateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      _id: this.props.categories.category_id,
      category: this.props.categories.category
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
    const content = {
      category_id: this.state._id,
      category: this.state.category
    };
    console.log(content);

    axios
      .put(api.UPDATECATEGORY, content)
      .then((res) => {
        this.props.renderCategory(res.data);
        this.setState({
          modal: false,
          category: ''
        });
        NotificationManager.success('Update Successful!', 'Successful!', 8000);
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
        <Modal isOpen={this.state.modal} size="lg" dialogClassName="modal-90w" toggle={this.toggle}>
          <form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.toggle}>Update Category Details</ModalHeader>
            <ModalBody>
              <NotificationContainer />
              <div className="mb-3">
                <span>Update Category</span>
              </div>
              <div className="w-100">
                <hr />
              </div>
              <Row form>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleCity">
                      <span style={mystyle}>Category Name</span>
                    </Label>
                    <Input
                      style={mystyle}
                      placeholder="Brand"
                      value={this.state.category}
                      type="text"
                      onChange={this.handleChange}
                      name="category"
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

export default UpdateCategory;
