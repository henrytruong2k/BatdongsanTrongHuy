import React from 'react';
import postAPI from '../../../../../api/postAPI';

function useGetManagePost() {
  const [loading, setLoading] = React.useState(true);
  const [postList, setPostList] = React.useState([]);
  React.useEffect(() => {
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
  return { postList, setPostList, loading };
}

export default useGetManagePost;
