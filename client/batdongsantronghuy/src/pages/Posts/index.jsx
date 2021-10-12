import React from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import PostContainer from '../../containers/Project';
import useNotifyCount from '../../seo/useNotifyCount';
import { title } from '../../constants/title';

const PostsPage = (props) => {
  const location = useLocation();
  const [filter] = React.useState(() => {
    const params = queryString.parse(location.search);
    return params || null;
  });
  useNotifyCount(title.POSTS);
  return <PostContainer filterURL={filter} />;
};

export default PostsPage;
