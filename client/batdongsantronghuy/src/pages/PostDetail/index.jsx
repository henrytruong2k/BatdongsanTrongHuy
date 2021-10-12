import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import postAPI from '../../api/postAPI';
import Loading from '../../components/Loading';
import Wrapper from '../../components/Wrapper';
import PostDetail from '../../containers/Project/components/PostDetail';
import queryString from 'query-string';
import './style.scss';
import useNotifyCount from '../../seo/useNotifyCount';

const PostDetailPage = () => {
  const location = useLocation();
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState(() => {
    const params = queryString.parse(location.search);
    return params.type || null;
  });
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetchPostDetail = async () => {
      const postDetail = await postAPI.getDetailById(slug);

      setPost(postDetail.data);
      setIsLoading(false);
    };
    fetchPostDetail();
  }, [slug]);
  useNotifyCount(post?.title);
  return (
    <>
      <Wrapper>
        {isLoading ? <Loading /> : <PostDetail post={post} type={filterType} />}
      </Wrapper>
    </>
  );
};

export default PostDetailPage;
