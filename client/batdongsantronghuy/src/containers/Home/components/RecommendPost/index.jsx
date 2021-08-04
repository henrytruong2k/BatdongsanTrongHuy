import React from 'react';
import PostItem from '../../../Project/components/PostItem';
import { StyledRecommendPost } from './StyledRecommendPost';

const RecommendPost = ({ list, favoriteList }) => {
  const favoriteIDs = favoriteList.map((item) => item.id);
  return (
    <StyledRecommendPost>
      <h2 className="home__title">Bất động sản dành cho bạn</h2>
      <div className="row">
        {list.map((item) => {
          if (favoriteIDs.includes(item.id)) {
            return <PostItem key={item.id} post={item} clicked={true} />;
          }
          return <PostItem key={item.id} post={item} clicked={false} />;
        })}
      </div>
    </StyledRecommendPost>
  );
};

export default RecommendPost;
