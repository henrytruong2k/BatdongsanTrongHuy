import axiosClient from './axiosClient';

const userAPI = {
  register(data) {
    const url = '/Account/register';
    

    return axiosClient.post(url, data);
  },
};

export default userAPI;
