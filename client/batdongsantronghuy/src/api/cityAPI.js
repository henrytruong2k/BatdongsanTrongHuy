import axiosClient from './axiosClient';

const cityAPI = {
  getAll(params) {
    const url = '/Cities/GetAllCities';

    //{ params: params } maybe use {params}
    return axiosClient.get(url, { params });
  },
};

export default cityAPI;
