import axiosClient from './axiosClient';

const categoryAPI = {
  getAll(params) {
    const url = '/v1/Category/GetAllCategories';
    return axiosClient.get(url, { params });
  },
};

export default categoryAPI;
