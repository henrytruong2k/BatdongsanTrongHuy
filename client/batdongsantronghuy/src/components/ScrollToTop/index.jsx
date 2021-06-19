import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideMiniFavoritePosts } from '../../containers/FavoritePosts/favoritePostsSlice';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const closePopUp = () => {
    const action = hideMiniFavoritePosts();
    dispatch(action);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    closePopUp();
  }, [pathname]);

  return null;
}
