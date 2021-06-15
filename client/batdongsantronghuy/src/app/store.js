import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../containers/Auth/userSlice';
import favoriteReducer from '../containers/FavoritePosts/favoritePostsSlice';

const rootReducer = {
  user: userReducer,
  favorite: favoriteReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
