import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../containers/Auth/userSlice';
import favoriteReducer from '../containers/FavoritePosts/favoritePostsSlice';
import contentReducer from '../containers/Home/contentsSlice';

const rootReducer = {
  user: userReducer,
  favorite: favoriteReducer,
  content: contentReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
