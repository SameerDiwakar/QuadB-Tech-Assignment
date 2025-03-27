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
    <div className="weather-container bg-gradient-to-r from-pink-400 to-pink-500 text-white p-6 rounded-xl shadow-xl mt-6">
      <h2 className="text-3xl font-extrabold mb-5 flex items-center gap-3">
        <FaCloudSun className="text-yellow-300" /> Weather Info
      </h2>
      {loading && <p className="text-lg italic">Fetching weather data...</p>}
      {error && <p className="text-lg text-red-400 font-semibold">{error}</p>}
      {data && (
        <div className="weather-info space-y-3">
          <p className="text-xl flex items-center gap-3">
            <FaMapMarkerAlt className="text-yellow-300" /> City: <span className="font-bold">{data.name}</span>
          </p>
          <p className="text-xl flex items-center gap-3">
            <FaTemperatureHigh className="text-yellow-300" /> Temperature: <span className="font-bold">{data.main.temp}°C</span>
          </p>
          <p className="text-xl">
            Condition: <span className="font-bold capitalize">{data.weather[0].description}</span>
          </p>
        </div>
      )}
      {!loading && !data && !error && <p className="text-lg italic">No tasks to fetch weather for...</p>}
    </div>
  );
};

export default WeatherList;