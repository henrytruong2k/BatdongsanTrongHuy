import { failedImages } from '../constants/config';

export const addDefaultSrc = (e) => {
  e.target.src = failedImages;
};
