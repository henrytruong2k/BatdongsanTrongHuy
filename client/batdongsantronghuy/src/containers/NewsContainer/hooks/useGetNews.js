import React, { useState, useEffect } from 'react';
import newAPI from '../../../api/newAPI';

const useGetNews = () => {
  const [loading, setLoading] = useState(true);
  const [newList, setNewList] = useState([]);
  const [newTopList, setNewTopList] = useState([]);
  const [type, setType] = useState(null);
  useEffect(() => {
    try {
      const fetchAllPostsOfUser = async () => {
        const { data } = await newAPI.getAll();

        setNewList(data.news);
        setNewTopList(data.newsTop);
        setLoading(false);
      };
      fetchAllPostsOfUser();
    } catch (error) {
      console.log('Failed to fetch news: ', error);
    }
  }, []);
  return {
    newList,
    newTopList,
    type,
    loading,
    setNewList,
    setLoading,
    setType,
  };
};

export default useGetNews;
