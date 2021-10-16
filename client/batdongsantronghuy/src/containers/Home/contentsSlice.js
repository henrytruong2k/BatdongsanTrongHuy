import homeAPI from '../../api/homeAPI';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const listContents = createAsyncThunk(
  'contents/fetchContents',
  async () => {
    try {
      let loading = true;
      const { data } = await homeAPI.getContents();

      const {
        projectsHighlight,
        newsHighlight,
        postsHighlight,
        contentBanners,
      } = data;
      loading = false;
      return {
        projectsHighlight,
        newsHighlight,
        postsHighlight,
        contentBanners,
        loading,
      };
    } catch (error) {
      console.log('Failed to fecth contents homepage: ', error);
    }
  }
);

const contentsSlice = createSlice({
  name: 'contents',
  initialState: {
    projects: [],
    news: [],
    postsHighlight: [],
    contentBanners: [],
    loading: true,
  },
  reducers: {},
  extraReducers: {
    [listContents.fulfilled]: (state, action) => {
      state.projects = action.payload.projectsHighlight;
      state.news = action.payload.newsHighlight;
      state.postsHighlight = action.payload.postsHighlight;
      state.contentBanners = action.payload.contentBanners;
      state.loading = action.payload.loadingl;
    },
  },
});
const { reducer } = contentsSlice;
export default reducer;
