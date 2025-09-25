import axios from 'axios';
import { API_URL } from '@env';

const axiosClient = axios.create({
  baseURL:  API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;