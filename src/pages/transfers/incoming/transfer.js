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
      // console.log(res)
      this.setState({ transfers: res.data });
    });
  };
  onRenderTransfer = (value) => {
    this.setState({
      transfers: value
    });
    this.showAllTransfers();
  };
  render() {
    const Transfers = (this.state.transfers || []).map((transfer, index) => {
      return {
        Quantity: transfer.quantity,
        Product: transfer.product,
        From: transfer.transfer_from,
        State: transfer.transfer_state,
        TimeStamp: transfer.created_on,
        Action: (
          <div>
            <UpdateBrand brands={brand} renderBrand={this.onRenderBrand} />
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
          label: 'Product',
          field: 'Product',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'From',
          field: 'From',
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
          label: 'TimeStamp',
          field: 'TimeStamp',
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
        <Col sm xs="12" className=" mt-3 mb-3">
          <AddBrand renderBrand={this.onRenderBrand} />
        </Col>
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
