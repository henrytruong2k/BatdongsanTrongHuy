import React, { useEffect, useState } from 'react';
import postAPI from '../../../api/postAPI';

function useManagePost() {
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    try {
      const fetchAllPostsOfUser = async () => {
        const response = await postAPI.getAllPostByUser();
        setPostList(response?.data);
        setLoading(false);
      };
      fetchAllPostsOfUser();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return { postList, loading, setPostList };
}

export default useManagePost;
