import userAPI from '../../api/userAPI';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const register = createAsyncThunk('user/register', async (payload) => {
  // call API to register
  const data = await userAPI.register(payload);

  // save data to local storage
  localStorage.setItem('access_token', data.message);
  localStorage.setItem('user', JSON.stringify(data.data));

  // return user data
  return data.data;
});

export const login = createAsyncThunk('user/login', async (payload) => {
  // call API to register
  const data = await userAPI.login(payload);

  // save data to local storage
  localStorage.setItem('access_token', data.data.jwToken);
  localStorage.setItem('user', JSON.stringify(data.data));

  // return user data
  return data.data;
});
const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {},
    settings: {},
  },
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = {
        url: action.payload,
      };
    },
    [login.fulfilled]: (state, action) => {
      state.current = {
        user: action.payload,
      };
    },
  },
});

const { reducer } = userSlice;
export default reducer;
