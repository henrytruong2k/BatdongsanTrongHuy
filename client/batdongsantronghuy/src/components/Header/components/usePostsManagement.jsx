import React, { useEffect, useState } from 'react';
import postAPI from '../../../api/postAPI';

function usePostsManagement(name) {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    try {
      const fetchAllPostsOfUser = async () => {
        const response = await postAPI.getAllPostsByNameContact(name);
        setPostList(response?.data);
      };
      fetchAllPostsOfUser();
    } catch (error) {
      console.log(error.message);
    }
  }, [name]);
  return { postList };
}

export default usePostsManagement;
