import axiosClient from './axiosClient';

const newAPI = {
  getAll(params) {
    const url = '/v1/New/GetAllNews';

    return axiosClient.get(url, { params });
  },
  getAllTypes() {
    const url = '/v1/NewType/GetAllNewType';
    return axiosClient.get(url);
  },
  getDetailBySlug(slug) {
    if (!slug) return;

    const url = `/v1/New/GetNewDetailById?Id=${slug}`;
    return axiosClient.get(url);
  },
};

export default newAPI;
