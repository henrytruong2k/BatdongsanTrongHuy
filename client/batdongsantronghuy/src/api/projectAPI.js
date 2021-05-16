import axiosClient from './axiosClient';

const projectAPI = {
  getAll(params) {
    const url = '/v1/Project/GetAllProjects';
    return axiosClient.get(url, { params });
  },
};

export default projectAPI;
