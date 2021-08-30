import api from '../../services';
import axios from 'axios';

export default function getBrands() {
  // const  AUTH_TOKEN= localStorage.getItem("auth");

  // const config = {
  //     headers: {
  //         'Authorization': 'Bearer ' + AUTH_TOKEN,
  //     }
  // };
  return axios.get(api.ALLBRANDS);
}
