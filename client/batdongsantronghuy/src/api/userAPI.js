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
    const url = '/Account/authenticate-google';
    return axiosClient.post(url, data);
  },

  updateUser(data) {
    const url = '/Account/update-user';

    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]);
    }
    return axiosClient.put(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  changePassword(data) {
    const url = '/Account/change-password';
    return axiosClient.post(url, data);
  },
};

export default userAPI;
