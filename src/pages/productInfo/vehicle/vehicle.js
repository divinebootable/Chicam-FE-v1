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
import AddVehicle from './addVehicle';
import UpdateVehicle from './updateVehicle';
import api from '../../../services';
import axios from 'axios';

class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: []
    };
    this.showAllVehicles();
  }

  showAllVehicles = () => {
    // const  AUTH_TOKEN= localStorage.getItem("auth");
    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + AUTH_TOKEN,
    //     }
    // };
    axios.get(api.ALLVEHICLES).then((res) => {
      // console.log(res)
      this.setState({ vehicles: res.data });
    });
  };
  onRenderVehicle = (value) => {
    this.setState({
      vehicles: value
    });
    this.showAllVehicles();
  };
  render() {
    const Vehicles = (this.state.vehicles || []).map((vehicle, index) => {
      return {
        Vehicle: vehicle.vehicle_name,
        Action: (
          <div>
            <UpdateVehicle vehicles={vehicle} renderVehicle={this.onRenderVehicle} />
            <MDBIcon
              icon="trash-alt"
              onClick={() => this.submit(profile)}
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
          label: 'Vehicle',
          field: 'Vehicle',
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
      rows: Vehicles
    };
    return (
      <div className="animated fadeIn">
        <Col sm xs="12" className=" mt-3 mb-3">
          <AddVehicle renderVehicle={this.onRenderVehicle} />
        </Col>
        <Col>
          <Card>
            <NotificationContainer />
            <CardHeader>
              <i className="fa fa-suitcase"></i> Vehicles
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

export default Vehicle;
