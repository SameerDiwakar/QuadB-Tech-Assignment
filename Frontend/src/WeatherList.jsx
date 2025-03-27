import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, clearWeatherData } from './weatherSlice';
import { FaCloudSun, FaTemperatureHigh, FaMapMarkerAlt } from 'react-icons/fa';

const WeatherList = ({ tasks }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weather);

  const taskWithCity = tasks.length > 0 ? tasks[tasks.length - 1] : null;
  const city = taskWithCity && taskWithCity.city ? taskWithCity.city : 'Delhi';

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(clearWeatherData());
    } else {
      dispatch(fetchWeather(city));
    }
  }, [dispatch, city, tasks]);

  return (
    <div className="weather-container bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-5 rounded-lg shadow-lg mt-5">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaCloudSun /> Weather Info
      </h2>
      {loading && <p className="text-lg">Loading...</p>}
      {error && <p className="text-lg text-red-500">{error}</p>}
      {data && (
        <div className="weather-info">
          <p className="text-xl flex items-center gap-2">
            <FaMapMarkerAlt /> City: <span className="font-semibold">{data.name}</span>
          </p>
          <p className="text-xl flex items-center gap-2">
            <FaTemperatureHigh /> Temperature: <span className="font-semibold">{data.main.temp}°C</span>
          </p>
          <p className="text-xl">Condition: <span className="font-semibold capitalize">{data.weather[0].description}</span></p>
        </div>
      )}
      {!loading && !data && !error && <p className="text-lg">No tasks to fetch weather for.</p>}
    </div>
  );
};

export default WeatherList;