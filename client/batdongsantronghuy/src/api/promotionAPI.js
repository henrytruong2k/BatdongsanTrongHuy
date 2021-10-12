import axiosClient from './axiosClient';

const promotionAPI = {
  checkPromotionCode(data) {
    const url = 'v1/Promotion/CheckPromotionCode';
    if (!data) {
      return;
    }

    return axiosClient.post(url, data);
  },
};

export default promotionAPI;
