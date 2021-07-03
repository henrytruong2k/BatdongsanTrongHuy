import React, { useState, useEffect } from 'react';
import newAPI from '../../../api/newAPI';

const useGetNews = () => {
  const [loading, setLoading] = useState(true);
  const [newList, setNewList] = useState([]);
  const [type, setType] = useState(null);
  useEffect(() => {
    try {
      const fetchAllPostsOfUser = async () => {
        const response = await newAPI.getAll();
        setNewList(response?.data);
        setLoading(false);
      };
      fetchAllPostsOfUser();
    } catch (error) {
      console.log('Failed to fetch news: ', error);
    }
  }, []);
  return { newList, type, loading, setNewList, setLoading, setType };
};

export default useGetNews;
