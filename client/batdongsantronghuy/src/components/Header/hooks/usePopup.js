import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  hideMiniFavoritePosts,
  showMiniFavoritePosts,
} from '../../../containers/FavoritePosts/favoritePostsSlice';

function usePopup() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.favorite.showMiniFavoritePosts);

  const handleTogglePopUp = () => {
    if (open) {
      const action = hideMiniFavoritePosts();
      dispatch(action);
    } else {
      const action = showMiniFavoritePosts();
      dispatch(action);
    }
  };
  return {
    open,
    handleTogglePopUp,
  };
}

export default usePopup;
