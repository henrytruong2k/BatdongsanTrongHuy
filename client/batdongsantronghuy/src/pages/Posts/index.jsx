import React, { useEffect } from 'react';

import PostContainer from '../../containers/Project';

const PostsPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <PostContainer />;
};

export default PostsPage;
