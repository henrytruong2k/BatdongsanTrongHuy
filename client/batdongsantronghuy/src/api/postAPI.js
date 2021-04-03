import axiosClient from './axiosClient';

const postAPI = {
  getAll(params) {
    const url = '/Posts/GetAllPosts';

    //{ params: params } maybe use {params}
    return axiosClient.get(url, { params });
  },
};

export default postAPI;
