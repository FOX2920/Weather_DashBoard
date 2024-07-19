import React from 'react';

function Forecast({ forecast }) {
    return (
        <div className="days-forecast">
            <h2>4-Day Forecast</h2>
            <ul className="weather-cards">
                {forecast.map((item, index) => (
                    <li className="card" key={index}>
                        <h3>({item.dt_txt.split(" ")[0]})</h3>
                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`} alt="weather-icon" />
                        <h6>Temp: {(item.main.temp - 273.15).toFixed(2)}°C</h6>
                        <h6>Wind: {item.wind.speed} M/S</h6>
                        <h6>Humidity: {item.main.humidity}%</h6>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Forecast;