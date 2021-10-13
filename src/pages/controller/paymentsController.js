import api from '../../services';
import axios from 'axios';

export default function showAllSales() {
  const users = localStorage.getItem('auth');
  // const config = {
  //     headers: {
  //         'Authorization': 'Bearer ' + AUTH_TOKEN,
  //     }
  // };
  return axios.get(api.ALLSALESBYID + `/${users}`);
}
