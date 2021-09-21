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
import AddAccount from './addAccount';
import UpdateAccount from './updateAccount';
import api from '../../../services';
import axios from 'axios';

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: []
    };
    this.showAllAccounts();
  }

  showAllAccounts = () => {
    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + AUTH_TOKEN,
    //     }
    // };
    axios
      .get(api.ALLUSERS)
      .then((res) => {
        this.setState({ accounts: res.data });
      })
      .catch((err) => console.log(err));
  };

  onRenderAccounts = (value) => {
    this.setState({
      accounts: value
    });
    this.showAllAccounts();
  };

  blockAccount = (value) => {
    console.log(value)
    const content={
      users:value
    }
   axios.put(api.BLOCKACCOUNT, content).then(() => {
     this.showAllAccounts();
    })
   .catch((error)=>{console.log(error)})
  };

   unBlockAccount = (value) => {
    console.log(value)
    const content={
      users:value
    }
   axios.put(api.UNBLOCKACCOUNT, content).then(() => {
     this.showAllAccounts();
    })
   .catch((error)=>{console.log(error)})
  };

  render() {
    const Accounts = (this.state.accounts || []).map((user, index) => {
      return {
        Username: user.username,
        Role: user.role,
        Warehouse: user.warehouse,
        State: !user.blocked ? (
          <MDBIcon
            role="button"
            icon="lock-open"
            onClick={() => this.blockAccount(user.users_id)}
            className=" green-text mr-3 ml-auto"
            size="1x"
          />
        ) : (
          <MDBIcon 
          icon="lock" 
          onClick={() => this.unBlockAccount(user.users_id)}
          className=" red-text mr-3 ml-auto" 
          size="1x" />
        ),
        Action: (
          <div>
            <UpdateAccount accounts={user} renderAccounts={this.onRenderAccounts} />
            <MDBIcon
              icon="trash-alt"
              onClick={() => this.submit(expense)}
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
          label: 'Warehouse',
          field: 'Warehouse',
          sort: 'asc',
          width: 70,
          height: 50
        },
        {
          label: 'Username',
          field: 'Username',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Role',
          field: 'Role',
          sort: 'asc',
          width: 50,
          height: 50
        },
        {
          label: 'State',
          field: 'State',
          sort: 'asc',
          width: 50,
          height: 50
        },
        {
          label: 'Action',
          field: 'Action',
          sort: 'asc',
          width: 65
        }
      ],
      rows: Accounts
    };
    return (
      <div className="animated fadeIn">
        <Col sm xs="12" className=" mt-3 mb-3">
          <AddAccount renderAccount={this.showAllAccounts} />
        </Col>
        <Col>
          <div className="container-fluid" style={{ width: '80%', fontSize: '10px' }}>
            <MDBDataTable
              small
              scrollY
              fontSize="2px"
              data={data}
              responsive
              bordered
              hover
              className="your-custom-styles"
            />
          </div>
        </Col>
        <NotificationContainer />
      </div>
    );
  }
}

export default Accounts;
