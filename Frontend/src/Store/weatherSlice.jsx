import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchWeatherStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchWeatherFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearWeatherData: (state) => {
      state.data = null;
      state.error = null;
    },
  },
});

export const {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  clearWeatherData,
} = weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;

// Async Thunk Function to Fetch Weather
export const fetchWeather = (city) => async (dispatch) => {
  dispatch(fetchWeatherStart());
  try {
    const response = await axios.get(
      `http://localhost:4000/weather?city=${city}` // Fetch weather for the provided city
    );
    dispatch(fetchWeatherSuccess(response.data));
  } catch (error) {
    dispatch(fetchWeatherFailure(error.response?.data?.message || 'Failed to fetch weather data'));
  }
};