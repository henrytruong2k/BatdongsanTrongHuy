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

  //handle when API response login failed
  if (!data.succeeded) {
    return data;
  }
  // save data to local storage
  localStorage.setItem('access_token', data.data.jwToken);
  localStorage.setItem('user', JSON.stringify(data.data));

  // return user data
  return data.data;
});
export const loginFacebook = createAsyncThunk(
  'user/loginFacebook',
  async (payload) => {
    const data = await userAPI.loginFacebook({ token: payload.token });
    const avatar = payload?.avatar;
    //save data to local storage
    localStorage.setItem('access_token', data.data.jwToken);
    localStorage.setItem('user', JSON.stringify({ ...data.data, avatar }));

    //return user data
    return { ...data.data, avatar };
  }
);
export const loginGoogle = createAsyncThunk(
  'user/loginGoogle',
  async (payload) => {
    const data = await userAPI.loginGoogle({ token: payload.token });
    const avatar = payload?.avatar;

    //save data to local storage
    localStorage.setItem('access_token', data.data.jwToken);
    localStorage.setItem('user', JSON.stringify({ ...data.data, avatar }));

    //return user data
    return { ...data.data, avatar };
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {
      user: JSON.parse(localStorage.getItem('user')),
    },
    settings: {},
    list: [],
  },
  reducers: {
    logout(state) {
      //clear local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      console.log('logout');
      state.current = {};
    },
  },
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
    [loginFacebook.fulfilled]: (state, action) => {
      state.current = {
        user: action.payload,
      };
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
