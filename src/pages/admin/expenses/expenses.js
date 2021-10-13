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
import api from '../../../services';
import axios from 'axios';
import generatePDF from './reportGenerator';

class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: []
    };
    this.showAllExpenseById();
  }

  showAllExpenseById = () => {
    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + AUTH_TOKEN,
    //     }
    // };
    axios
      .get(api.ALLEXPENSES)
      .then((res) => {
        console.log('expense' + res);
        this.setState({ expense: res.data });
      })
      .catch((err) => console.log(err));
  };
  onRenderExpense = (value) => {
    this.setState({
      expense: value
    });
    this.showAllExpenseById();
  };
  render() {
    const generalReport = this.state.expense.filter((value) => value.is_delete === false);
    const Expenses = (this.state.expense || []).map((expense, index) => {
      const time = expense.created_on; // get only date
      const created = time.split('T'); // get only date
      return {
        Expense: expense.expense,
        Amount: expense.amount,
        Warehouse: expense.warehouse,
        Username: expense.username,
        Time: created[0],
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
          label: 'Warehouse',
          field: 'Warehouse',
          sort: 'asc',
          width: 75,
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
          width: 65
        }
      ],
      rows: Expenses
    };
    return (
      <div className="animated fadeIn">
        <Row className="ml-5">
          <button className="btn btn-primary" onClick={() => generatePDF(generalReport)}>
            Generate report
          </button>
          <AddExpense renderExpense={this.onRenderExpense} />
        </Row>
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
