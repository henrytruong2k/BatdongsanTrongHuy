import axiosClient from './axiosClient';

const cityAPI = {
  getAll(params) {
    const url = '/v1/Cities/GetAllCities';

    //{ params: params } maybe use {params}
    return axiosClient.get(url, { params });
  },
  getDistrictsByCityId(id) {
    const url = `/v1/Districts/GetDistricByCityId?CityId=${id}`;

    return axiosClient.get(url);
  },
};

export default cityAPI;
