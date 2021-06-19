const { createSlice } = require('@reduxjs/toolkit');

const favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
const favoritePostsSlice = createSlice({
  name: 'favoritePosts',
  initialState: {
    showMiniFavoritePosts: false,
    favoriteItems: favoriteList || [],
  },
  reducers: {
    showMiniFavoritePosts(state) {
      state.showMiniFavoritePosts = true;
    },
    hideMiniFavoritePosts(state) {
      state.showMiniFavoritePosts = false;
    },

    addToFavoritePosts(state, action) {
      const newItem = action.payload;
      const index = state.favoriteItems.findIndex((x) => x.id === newItem.id);
      if (index >= 0) {
        //handle not to add
        console.log('from redux: đã tồn tại');
        return;
      } else {
        state.favoriteItems.push(newItem);
        //save to localStorage
        const favoriteList =
          JSON.parse(localStorage.getItem('favoriteList')) || [];
        favoriteList.push(newItem);
        localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
      }
    },
    removeFromFavoritePosts(state, action) {
      const idNeedToRemove = action.payload;
      state.favoriteItems = state.favoriteItems.filter(
        (x) => x.id !== idNeedToRemove
      );
      localStorage.setItem('favoriteList', JSON.stringify(state.favoriteItems));
    },
  },
});

const { actions, reducer } = favoritePostsSlice;
export const {
  showMiniFavoritePosts,
  hideMiniFavoritePosts,
  addToFavoritePosts,
  removeFromFavoritePosts,
} = actions;
export default reducer;
