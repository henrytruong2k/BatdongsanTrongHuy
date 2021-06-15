const { createSlice } = require('@reduxjs/toolkit');

const favoritePostsSlice = createSlice({
  name: 'favoritePosts',
  initialState: {
    showMiniFavoritePosts: false,
    favoriteItems: [
      {
        id: 1,
        title: 'test 1',
        isClicked: true,
      },
      {
        id: 2,
        title: 'test 2',
        isClicked: false,
      },
    ],
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
      } else {
        state.favoriteItems.push(newItem);
      }
    },
    removeFromFavoritePosts(state, action) {
      const idNeedToRemove = action.payload;
      state.favoriteItems = state.favoriteItems.filter(
        (x) => x.id !== idNeedToRemove
      );
    },
  },
});

const { actions, reducer } = favoritePostsSlice;
export const { showMiniFavoritePosts, hideMiniFavoritePosts } = actions;
export default reducer;
