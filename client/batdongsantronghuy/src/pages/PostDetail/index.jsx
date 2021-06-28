import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import postAPI from '../../api/postAPI';
import Loading from '../../components/Loading';
import Wrapper from '../../components/Wrapper';
import PostDetail from '../../containers/Project/components/PostDetail';
import './style.scss';

const PostDetailPage = () => {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetchPostDetail = async () => {
      const postDetail = await postAPI.getDetailById(slug);

      setPost(postDetail.data);
      setIsLoading(false);
    };
    fetchPostDetail();
  }, [slug]);

  return (
    <Wrapper>{isLoading ? <Loading /> : <PostDetail post={post} />}</Wrapper>
  );
};

export default PostDetailPage;
