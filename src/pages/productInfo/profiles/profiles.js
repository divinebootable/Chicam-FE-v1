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
import AddProfile from './addProfile';
import UpdateProfile from './updateProfile';
import api from '../../../services';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: []
    };
    this.showAllProfiles();
  }

  showAllProfiles = () => {
    // const  AUTH_TOKEN= localStorage.getItem("auth");
    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + AUTH_TOKEN,
    //     }
    // };
    axios.get(api.ALLPROFILES).then((res) => {
      // console.log(res)
      this.setState({ profiles: res.data });
    });
  };
  onRenderProfile = (value) => {
    this.setState({
      profiles: value
    });
    this.showAllProfiles();
  };
  render() {
    const Profiles = (this.state.profiles || []).map((profile, index) => {
      return {
        Profile: profile.profile_name,
        Action: (
          <div>
            <UpdateProfile profiles={profile} renderProfile={this.onRenderProfile} />
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
          label: 'Profile',
          field: 'Profile',
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
      rows: Profiles
    };
    return (
      <div className="animated fadeIn">
        <Col sm xs="12" className=" mt-3 mb-3">
          <AddProfile renderProfile={this.onRenderProfile} />
        </Col>
        <Col>
          <NotificationContainer />
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
      </div>
    );
  }
}

export default Profile;
