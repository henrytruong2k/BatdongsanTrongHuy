import axiosClient from './axiosClient';

const cityAPI = {
  getAll(params) {
    const url = '/v1/City/GetAllCities';

    //{ params: params } maybe use {params}
    return axiosClient.get(url, { params });
  },
  getDistrictsByCityId(id) {
    const url = `/v1/District/GetDistricByCityId?CityId=${id}`;

    return axiosClient.get(url);
  },
};

export default cityAPI;
