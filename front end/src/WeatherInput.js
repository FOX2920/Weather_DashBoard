import React, { useState } from 'react';

const WeatherInput = ({ fetchWeather }) => {
    const [cityName, setCityName] = useState('');

    const getCityCoordinates = async () => {
        if (cityName.trim() === "") return;
        const API_KEY = "6bba8762e4b27a73bee6016d8498ea66";
        const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (!data.length) return alert(`No coordinates found for ${cityName}`);
            const { lat, lon, name } = data[0];
            fetchWeather(name, lat, lon);
            setCityName('');
        } catch {
            alert("An error occurred while fetching the coordinates!");
        }
    };

    const getUserCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const API_KEY = "6bba8762e4b27a73bee6016d8498ea66";
                const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
                fetch(API_URL).then(response => response.json()).then(data => {
                    const { name } = data[0];
                    fetchWeather(name, latitude, longitude);
                }).catch(() => {
                    alert("An error occurred while fetching the city name!");
                });
            },
            error => {
                if (error.code === error.PERMISSION_DENIED) {
                    alert("Geolocation request denied. Please reset location permission to grant access again.");
                } else {
                    alert("Geolocation request error. Please reset location permission.");
                }
            }
        );
    };

    return (
        <div className="weather-input">
            <h3>Enter a City Name</h3>
            <input
                className="city-input"
                type="text"
                placeholder="E.g., New York, London, Tokyo"
                value={cityName}
                onChange={e => setCityName(e.target.value)}
                onKeyUp={e => e.key === "Enter" && getCityCoordinates()}
            />
            <button className="search-btn" onClick={getCityCoordinates}>Search</button>
            <div className="separator"></div>
            <button className="location-btn" onClick={getUserCoordinates}>Use Current Location</button>
        </div>
    );
};

export default WeatherInput;
