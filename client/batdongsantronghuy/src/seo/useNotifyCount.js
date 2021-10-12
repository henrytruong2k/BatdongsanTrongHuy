import React from 'react';
import { useSelector } from 'react-redux';
import useDocumentTitle from './useDocumentTitle';
import { title } from '../constants/title';

const useNotifyCount = (data = '') => {
  const favoriteList = useSelector((state) => state.favorite.favoriteItems);
  const titlePrefix = title.ROOT;
  const notifyCount = favoriteList.length > 0 ? `(${favoriteList.length})` : '';
  const titleMsg = data && ` | ${data}`;
  return useDocumentTitle(`${notifyCount} ${titlePrefix}${titleMsg}`);
};

export default useNotifyCount;
