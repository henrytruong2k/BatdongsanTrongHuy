import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://batdongsanth.azurewebsites.net/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors
axiosClient.interceptors.request.use(
  function (config) {
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
      return Promise.reject(error);
    } catch (error) {
      console.log(error);
    }
  }
);

export default axiosClient;
