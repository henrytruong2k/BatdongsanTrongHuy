import axiosClient from './axiosClient';

const userAPI = {
  register(data) {
    const url = '/Account/register';
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = '/Account/authenticate';
    return axiosClient.post(url, data);
  },
  loginFacebook(data) {
    const url = '/Account/authenticate-social';
    return axiosClient.post(url, data);
  },
};

export default userAPI;
