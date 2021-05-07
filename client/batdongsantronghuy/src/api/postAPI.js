import axiosClient from './axiosClient';

const postAPI = {
  getAll(params) {
    const url = '/v1/Post/GetAllPosts';

    //{ params: params } maybe use {params}
    return axiosClient.get(url, { params });
  },

  getDetailById(id) {
    const url = `/v1/Post/GetDetailById?id=${id}`;
    return axiosClient.get(url);
  },

  getPostByCityId(id) {
    const url = `/v1/Post/SearchPostByCityId?CityId=${id}`;
    console.log(url);
    return axiosClient.get(url);
  },
  getPostByDistrictId(id) {
    const url = `/v1/Post/SearchPostByDistrictId?DistrictId=${id}`;
    return axiosClient.get(url);
  },
  getPostByPrice(max, min) {
    const url = `/v1/Post/SearchPostByPrice?MaxPrice=${max}&MinPrice=${min}`;
    return axiosClient.get(url);
  },
};

export default postAPI;
