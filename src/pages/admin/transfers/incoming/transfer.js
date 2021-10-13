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
import api from '../../../services';
import axios from 'axios';

class Transfers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transfers: []
    };
    this.showAllTransfers();
  }

  showAllTransfers = () => {
    const users = localStorage.getItem('auth');
    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + AUTH_TOKEN,
    //     }
    // };
    axios.get(api.ALLTRANSFERBYID + `/${users}`).then((res) => {
      this.setState({ transfers: res.data });
    })
    .catch((error)=>{console.log(error)})
  };
  onRenderTransfer = (value) => {
    this.setState({
      transfers: value
    });
    this.showAllTransfers();
  };
  render() {
    const Transfers = (this.state.transfers || []).map((transfer, index) => {
console.log("response" + transfer)
      const time = transfer.created_on; // get only date
      const created = time.split('T'); // get only date
      return {
        Quantity: transfer.quantity,
        Profile: transfer.profile_name,
        Vehicle: transfer.vehicle_name,
        Brand: transfer.brand_name,
        State: !transfer.transfer_state ? (
          <MDBIcon icon="spinner" className=" red-text mr-3 ml-auto" size="1x" />
        ) : (
          <MDBIcon icon="check" className=" green-text mr-3 ml-auto" size="1x" />
        ),
        Time: created[0],
        Action: (
          <div>
            <MDBIcon
              icon="trash-alt"
              onClick={() => this.submit(transfer)}
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
          label: 'Quantity',
          field: 'Quantity',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Profile',
          field: 'Profile',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Vehicle',
          field: 'Vehicle',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Brand',
          field: 'Brand',
          sort: 'asc',
          width: 75,
          height: 50
        },
       
        {
          label: 'State',
          field: 'State',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Time',
          field: 'Time',
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
      rows: Transfers
    };
    return (
      <div className="animated fadeIn">
        <Col>
          <Card>
            <NotificationContainer />
            <CardHeader>
              <i className="fa fa-suitcase"></i> Transfers
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

export default Transfers;
