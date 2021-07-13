import axiosClient from './axiosClient';

const homeAPI = {
  getContents() {
    const url = '/v1/Home/GetContentHomePage';
    return axiosClient.get(url);
  },
};

export default homeAPI;
