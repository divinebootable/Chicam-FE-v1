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
import AddBrand from './addBrand';
import UpdateBrand from './updatebrand';
import api from '../../../services';
import axios from 'axios';

class Brand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: []
    };
    this.showAllBrands();
  }

  showAllBrands = () => {
    // const  AUTH_TOKEN= localStorage.getItem("auth");
    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + AUTH_TOKEN,
    //     }
    // };
    axios.get(api.ALLBRANDS).then((res) => {
      // console.log(res)
      this.setState({ brands: res.data });
    });
  };
  onRenderBrand = (value) => {
    this.setState({
      brands: value
    });
    this.showAllBrands();
  };
  render() {
    const Brands = (this.state.brands || []).map((brand, index) => {
      return {
        Brand: brand.brand_name,
        Action: (
          <div>
            <UpdateBrand brands={brand} renderBrand={this.onRenderBrand} />
            <MDBIcon
              icon="trash-alt"
              onClick={() => this.submit(brand)}
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
          label: 'Brand',
          field: 'Brand',
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
      rows: Brands
    };
    return (
      <div className="animated fadeIn">
        <Col sm xs="12" className=" mt-3 mb-3">
          <AddBrand renderBrand={this.onRenderBrand} />
        </Col>
        <Col>
          <Card>
            <NotificationContainer />
            <CardHeader>
              <i className="fa fa-suitcase"></i> Brands
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

export default Brand;
