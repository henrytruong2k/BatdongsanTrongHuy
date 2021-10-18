import React, { useState, useEffect } from 'react';
import postAPI from '../../../api/postAPI';

function usePostDetail(id) {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    try {
      const fetchPostDetail = async () => {
        const postDetail = await postAPI.paymentPost({ postId: id });
        setPost(postDetail?.data);
        setLoading(false);
      };
      fetchPostDetail();
    } catch (error) {
      console.log('Fail to fetch post detail of payment page: ', error);
    }
  }, [id]);

  return { post, loading };
}

export default usePostDetail;
