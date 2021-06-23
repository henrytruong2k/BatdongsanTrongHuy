import axios from 'axios';
import { domain } from '../constants/config';

const axiosClient = axios.create({
  baseURL: domain,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors
axiosClient.interceptors.request.use(
  function (config) {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log('ERROR RESPONSE: ', error.response);

    try {
      const { config, status, data } = error.response;
      if (config.url === '/Account/register' && status === 400) {
        const { message } = data;
        throw new Error(message);
      }
      if (config.url === '/Account/authenticate' && status === 400) {
        const { message } = data;
        throw new Error(message);
      }
      if (config.url === '/v1/Post/CreatePost' && status === 500) {
        const message = 'Token hết hạn. Vui lòng đăng nhập';
        throw new Error(message);
      }
      if (config.url === '/v1/Post/CreatePost' && status === 400) {
        console.log('run');
        const { errors } = data;
        throw new Error(errors);
      }
      return Promise.reject(error);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }
);

export default axiosClient;
