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
      if (name === 'ImageFile') {
        if (data[name].length > 0) {
          data[name]?.forEach((item) => {
            formData.append('ImageFile', item);
          });
        }
      }
      formData.append(name, data[name]);
    }
    return axiosClient.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  async updatePost(data) {
    const url = `/v1/Post/UpdatePost/${data.id}`;

    const formData = new FormData();
    for (const name in data) {
      if (name === 'ImageFile') {
        if (data[name].length > 0) {
          data[name]?.forEach((item) => {
            formData.append('ImageFile', item);
          });
        }
      }
      formData.append(name, data[name]);
    }
    return axiosClient.put(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getAllPostsByNameContact(name) {
    const url = `/v1/Post/GetAllPostsByNameContact?NameContact=${name}`;
    return axiosClient.get(url);
  },
  commentPost(data) {
    const url = `/v1/Post/CommentPost`;
    return axiosClient.post(url, data);
  },

  getAllPostByUser() {
    const url = `/v1/Post/GetAllPostsByUser`;
    return axiosClient.get(url);
  },
  ratePost(data) {
    const url = `/v1/Post/RatePost`;
    return axiosClient.post(url, data);
  },
  deletePostByUser(id) {
    const url = `/v1/Post/DeletePostById/${id}`;
    return axiosClient.delete(url);
  },
  paymentPost(data) {
    const url = `/v1/Post/Payment`;
    return axiosClient.post(url, data);
  },
  reportComment(data) {
    const url = `v1/Post/ReportComment`;
    return axiosClient.post(url, data);
  },
};

export default postAPI;
