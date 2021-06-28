import axiosClient from './axiosClient';

const projectAPI = {
  getAll(params) {
    console.log('params: ', params);
    const url = '/v1/Project/GetAllProjects';
    return axiosClient.get(url, { params });
  },
  getAllTypes() {
    const url = '/v1/ProjectType/GetAllProjectTypes';
    return axiosClient.get(url);
  },
  getDetailBySlug(slug) {
    const url = `/v1/Project/GetProjectById/${slug}`;
    return axiosClient.get(url);
  },
};

export default projectAPI;
