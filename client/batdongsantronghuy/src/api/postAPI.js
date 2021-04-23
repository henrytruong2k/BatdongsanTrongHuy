import axiosClient from './axiosClient';

const postAPI = {
  getAll(params) {
    const url = '/v1/Posts/GetAllPosts';

    //{ params: params } maybe use {params}
    return axiosClient.get(url, { params });
  },

  getDetailById(id) {
    const url = `/v1/Posts/GetDetailById?id=${id}`;
    return axiosClient.get(url);
  },

  getPostByCityId(id) {
    const url = `/v1/Posts/SearchPostByCityId?CityId=${id}`;
    return axiosClient.get(url);
  },
  getPostByDistrictId(id) {
    const url = `/v1/Posts/SearchPostByDistrictId?DistrictId=${id}`;
    return axiosClient.get(url);
  },
};

export default postAPI;
