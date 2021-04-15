import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../containers/Auth/userSlice';
import counterReducer from '../containers/Counter/counterSlice';

const rootReducer = {
  counter: counterReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
