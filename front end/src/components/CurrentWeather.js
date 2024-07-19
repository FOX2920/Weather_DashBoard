import React from 'react';

function CurrentWeather({ data, cityName }) {
    return (
        <div className="current-weather">
            <div className="details">
                <h2>{cityName} ({data.dt_txt.split(" ")[0]})</h2>
                <h6>Temperature: {(data.main.temp - 273.15).toFixed(2)}°C</h6>
                <h6>Wind: {data.wind.speed} M/S</h6>
                <h6>Humidity: {data.main.humidity}%</h6>
            </div>
            <div className="icon">
                <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} alt="weather-icon" />
                <h6>{data.weather[0].description}</h6>
            </div>
        </div>
    );
}

export default CurrentWeather;