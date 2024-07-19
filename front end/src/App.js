import React, { useState, useEffect } from 'react';
import WeatherInput from './components/WeatherInput';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import EmailSubscription from './components/EmailSubscription';
import './App.css';

const API_BASE_URL = "http://localhost:8080"; // Update this if your backend is hosted elsewhere

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherHistory, setWeatherHistory] = useState([]);

  useEffect(() => {
    // Fetch weather data for London by default when the component mounts
    getWeatherDetails("London");
  }, []);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    setWeatherHistory(savedHistory);
  }, []);

  const getWeatherDetails = async (cityName) => {
    const WEATHER_API_URL = `${API_BASE_URL}/api/weather?city=${cityName}`;

    try {
      const response = await fetch(WEATHER_API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch weather data");
      }

      if (!data.forecast || data.forecast.length === 0) {
        alert("No weather data found!");
        return;
      }

      const newWeatherData = {
        cityName: data.cityName,
        forecast: data.forecast,
        timestamp: data.timestamp
      };
      setWeatherData(newWeatherData);

      const existingIndex = weatherHistory.findIndex(item => item.cityName.toLowerCase() === cityName.toLowerCase());
      let updatedHistory = existingIndex !== -1
        ? weatherHistory.filter((_, index) => index !== existingIndex)
        : [...weatherHistory];
      updatedHistory = [newWeatherData, ...updatedHistory].slice(0, 3); // Limit history to 3 items

      setWeatherHistory(updatedHistory);
      localStorage.setItem('weatherHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      alert("An error occurred while fetching the weather forecast!");
      console.error('Error details:', error);
    }
  };

  const displayWeatherHistory = () => {
    return weatherHistory.map((item, index) => (
      <div key={index} className="history-item" onClick={() => setWeatherData(item)}>
        <div className="history-info">
          <h3>{item.cityName}</h3>
          <p>{new Date(item.timestamp).toLocaleString()}</p>
        </div>
        <div className="history-temp">
          {(item.forecast[0].main.temp - 273.15).toFixed(1)}°C
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h1>Weather Dashboard</h1>
      <div className="container">
        <div className="left-column">
          <WeatherInput getWeatherDetails={getWeatherDetails} />
          <EmailSubscription />
          <div className="weather-history">
            <h2>Recent Searches</h2>
            {displayWeatherHistory()}
          </div>
        </div>
        <div className="weather-data">
          {weatherData && (
            <>
              <CurrentWeather data={weatherData.forecast[0]} cityName={weatherData.cityName} />
              <Forecast forecast={weatherData.forecast.slice(1)} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
