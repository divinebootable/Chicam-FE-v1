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
import AddExpense from './addExpense';
import UpdateExpense from './updateExpense';
import api from '../../services';
import axios from 'axios';

class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: []
    };
    this.showAllExpenseById();
  }

  showAllExpenseById = () => {
    const users = localStorage.getItem('auth');
    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + AUTH_TOKEN,
    //     }
    // };
    axios
      .get(api.ALLEXPENSEBYID + `/${users}`)
      .then((res) => {
        console.log(res);
        this.setState({ expense: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onRenderExpense = (value) => {
    this.setState({
      expense: value
    });
    this.showAllExpenseById();
  };
  render() {
    const Expenses = (this.state.expense || []).map((expense, index) => {
      return {
        Expense: expense.expense,
        Amount: expense.amount,
        Time: expense.created_on,
        Action: (
          <div>
            <UpdateExpense expenses={expense} renderExpense={this.onRenderExpense} />
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
          label: 'Expense',
          field: 'Expense',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Amount',
          field: 'Amount',
          sort: 'asc',
          width: 75,
          height: 50
        },
        {
          label: 'Time',
          field: 'Time',
          sort: 'asc',
          width: 65
        },
        {
          label: 'Action',
          field: 'Action',
          sort: 'asc',
          width: 65
        }
      ],
      rows: Expenses
    };
    return (
      <div className="animated fadeIn">
        <Col sm xs="12" className=" mt-3 mb-3">
          <AddExpense renderExpense={this.onRenderExpense} />
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

export default Expense;
