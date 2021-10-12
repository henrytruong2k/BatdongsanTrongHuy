import React from 'react';
import Wrapper from '../../components/Wrapper';
import FavoritePosts from '../../containers/FavoritePosts';
import useNotifyCount from '../../seo/useNotifyCount';
import { title } from '../../constants/title';

function FavoritePostsPage(props) {
  useNotifyCount(title.FAVORITES);
  return (
    <Wrapper>
      <FavoritePosts />
    </Wrapper>
  );
}

export default FavoritePostsPage;
