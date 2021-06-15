import React from 'react';
import styled from 'styled-components';
import FavoritePosts from '../../containers/FavoritePosts';

const Wrapper = styled.div`
  padding-top: 100px;
`;

function FavoritePostsPage(props) {
  return (
    <Wrapper>
      <FavoritePosts />
    </Wrapper>
  );
}

export default FavoritePostsPage;
