import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './reducers/movies';
import userReducer from './reducers/user';
import updatedUserReducer from './reducers/updatedUserInfo';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
    updatedUserInfo: updatedUserReducer
  }
});