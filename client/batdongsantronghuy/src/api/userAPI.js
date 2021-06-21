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
    const url = '/Account/authenticate-facebook';
    return axiosClient.post(url, data);
  },
  loginGoogle(data) {
    console.log('data userAPI loginGoogle: ', data);
    const url = '/Account/authenticate-google';
    return axiosClient.post(url, data);
  },
};

export default userAPI;
