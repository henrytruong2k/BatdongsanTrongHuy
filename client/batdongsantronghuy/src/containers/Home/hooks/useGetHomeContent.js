import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listContents } from '../contentsSlice';

const useGetHomeContent = () => {
  const dispatch = useDispatch();
  const contents = useSelector((state) => state.content);
  const { projects, news, postsHighlight, contentBanners, loading } = contents;

  useEffect(() => {
    dispatch(listContents());
  }, [dispatch]);
  return {
    projects,
    news,
    postsHighlight,
    contentBanners,
    loading,
  };
};

export default useGetHomeContent;
