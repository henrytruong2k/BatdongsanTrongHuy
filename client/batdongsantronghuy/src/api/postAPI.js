import QueryString from 'qs';
import { domain } from '../constants/config';
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

    return axiosClient.get(url);
  },
  getPostByCityPrice(id, max, min) {
    const url = `v1/Post/SearchPostByCityId?CityId=${id}&MaxPrice=${max}&MinPrice=${min}`;

    return axiosClient.get(url);
  },
  getPostByDistrictId(id) {
    const url = `/v1/Post/SearchPostByDistrictId?DistrictId=${id}`;
    return axiosClient.get(url);
  },
  getPostByDistrictIdPrice(id, max, min) {
    const url = `/v1/Post/SearchPostByDistrictId?DistrictId=${id}&MaxPrice=${max}&MinPrice=${min}`;

    return axiosClient.get(url);
  },
  getPostByPrice(max, min) {
    const url = `/v1/Post/SearchPostByPrice?MaxPrice=${max}&MinPrice=${min}`;
    return axiosClient.get(url);
  },
  getPostByKeyword(keyword) {
    const url = `/v1/Post/SearchPostByKeyword?Keyword=${keyword}`;
    return axiosClient.get(url);
  },
  async createPost(data) {
    const url = `/v1/Post/CreatePost`;

    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]);
    }
    // const access_token = localStorage.getItem('access_token');
    // // const accept = access_token
    // //   ? {
    // //       Authorization: `Bearer ${access_token}`,
    // //     }
    // //   : null;
    // const response = await fetch(domain + url, {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     Authorization: `Bearer ${access_token}`,
    //   },
    // });
    // return response.json();

    return axiosClient.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getAllPostsByNameContact(name) {
    const url = `/v1/Post/GetAllPostsByNameContact?NameContact=${name}`;
    return axiosClient.get(url);
  },
  commentPost(data) {
    console.log('data comment post: ', data);
    const url = `/v1/Post/CommentPost`;
    return axiosClient.post(url, data);
  },

  getAllPostByUser() {
    const url = `/v1/Post/GetAllPostsByUser`;
    return axiosClient.get(url);
  },
};

export default postAPI;
