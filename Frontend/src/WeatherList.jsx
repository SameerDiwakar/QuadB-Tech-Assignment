import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, clearWeatherData } from './weatherSlice';

const WeatherList = ({ tasks }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weather);

  

  const outdoorTask = tasks.find(task =>
    task.todo.toLowerCase().includes('walk') || task.todo.toLowerCase().includes('hiking')
  );


  useEffect(() => {
    if (outdoorTask) {
      dispatch(fetchWeather('Delhi')); 
    } else {
      dispatch(clearWeatherData()); 
    }
  }, [dispatch, outdoorTask]);

  return (
    <div>
      <h2>Weather Info for Outdoor Task</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <div>
          <p>City: {data.name}</p>
          <p>Temperature: {data.main.temp}°C</p>
          <p>Condition: {data.weather[0].description}</p>
        </div>
      )}
      {!loading && !data && !error && <p>No outdoor tasks to fetch weather for.</p>}
    </div>
  );
};

export default WeatherList;