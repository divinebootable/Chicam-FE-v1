import api from '../../services';
import axios from 'axios';

export default function getVehicles() {
  // const  AUTH_TOKEN= localStorage.getItem("auth");

  // const config = {
  //     headers: {
  //         'Authorization': 'Bearer ' + AUTH_TOKEN,
  //     }
  // };
  return axios.get(api.ALLVEHICLES);
}
