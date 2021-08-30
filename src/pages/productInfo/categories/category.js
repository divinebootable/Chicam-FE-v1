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
import AddCategory from './addCategory';
import UpdateCategory from './updateCategory';
import api from '../../../services';
import axios from 'axios';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
    this.showAllCategories();
  }

  showAllCategories = () => {
    // const  AUTH_TOKEN= localStorage.getItem("auth");
    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + AUTH_TOKEN,
    //     }
    // };
    axios.get(api.ALLCATEGORIES).then((res) => {
      // console.log(res)
      this.setState({ categories: res.data });
    });
  };
  onRenderCategory = (value) => {
    this.setState({
      categories: value
    });
    this.showAllCategories();
  };
  render() {
    const Categories = (this.state.categories || []).map((category, index) => {
      return {
        Category: category.category,
        Action: (
          <div>
            <UpdateCategory categories={category} renderCategory={this.onRenderCategory} />
            <MDBIcon
              icon="trash-alt"
              onClick={() => this.submit(category)}
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
          label: 'Action',
          field: 'Action',
          sort: 'asc',
          width: '75'
        }
      ],
      rows: Categories
    };
    return (
      <div className="animated fadeIn">
        <Col sm xs="12" className=" mt-3 mb-3">
          <AddCategory renderCategory={this.onRenderCategory} />
        </Col>
        <Col>
          <Card>
            <NotificationContainer />
            <CardHeader>
              <i className="fa fa-suitcase"></i> Categories
            </CardHeader>
            <CardBody>
              <div className="container-fluid" style={{ width: '80%', fontSize: '10px' }}>
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
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default Category;
