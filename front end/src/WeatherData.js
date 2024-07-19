import React from 'react';

const createWeatherCard = (cityName, weatherItem, index) => {
    if (index === 0) {
        return (
            <div className="details">
                <h2>{cityName} ({weatherItem.dt_txt.split(" ")[0]})</h2>
                <h6>Temperature: {(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                <h6>Wind: {weatherItem.wind.speed} M/S</h6>
                <h6>Humidity: {weatherItem.main.humidity}%</h6>
            </div>
        );
    } else {
        return (
            <li className="card">
                <h3>({weatherItem.dt_txt.split(" ")[0]})</h3>
                <img src={`https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png`} alt="weather-icon" />
                <h6>Temp: {(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                <h6>Wind: {weatherItem.wind.speed} M/S</h6>
                <h6>Humidity: {weatherItem.main.humidity}%</h6>
            </li>
        );
    }
};

const WeatherData = ({ weather }) => {
    return (
        <div className="weather-data">
            <div className="current-weather">
                {createWeatherCard(weather.cityName, weather.forecast[0], 0)}
            </div>
            <div className="days-forecast">
                <h2>5-Day Forecast</h2>
                <ul className="weather-cards">
                    {weather.forecast.slice(1).map((item, index) => createWeatherCard(weather.cityName, item, index + 1))}
                </ul>
            </div>
        </div>
    );
};

export default WeatherData;
