import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { weatherReducer } from './weatherSlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;