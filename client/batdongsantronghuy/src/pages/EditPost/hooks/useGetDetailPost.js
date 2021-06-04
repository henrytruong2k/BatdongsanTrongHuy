import React, { useEffect, useState } from 'react';
import postAPI from '../../../api/postAPI';

function useGetDetailPost(id) {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  useEffect(() => {
    try {
      const fetchAllPostsOfUser = async () => {
        const response = await postAPI.getDetailById(id);
        setPost(response?.data);
        setLoading(false);
      };
      fetchAllPostsOfUser();
    } catch (error) {
      console.log(error.message);
    }
  }, [id]);
  return { post, loading };
}

export default useGetDetailPost;
