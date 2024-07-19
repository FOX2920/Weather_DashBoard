import React, { useState } from 'react';

const API_BASE_URL = "http://localhost:8080"; // Update this if your backend is hosted elsewhere

function WeatherInput({ getWeatherDetails }) {
    const [cityInput, setCityInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (cityInput.trim() === "") return;
        setIsLoading(true);
        const API_URL = `${API_BASE_URL}/api/weather?city=${cityInput}`;

        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch weather data");
            }

            if (!data.forecast || data.forecast.length === 0) {
                throw new Error(`No weather data found for ${cityInput}`);
            }

            const { cityName } = data;
            getWeatherDetails(cityName); // No lat/lon needed here
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
            console.error('Error details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLocationClick = () => {
        if (!navigator.geolocation) {
            return alert("Geolocation is not supported by your browser");
        }

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const API_URL = `${API_BASE_URL}/api/reverse-geo?lat=${latitude}&lon=${longitude}`;
                try {
                    const response = await fetch(API_URL);
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data.error || "Failed to fetch city name");
                    }
                    if (!data.name) {
                        throw new Error("City name not found in the response");
                    }
                    getWeatherDetails(data.name);
                } catch (error) {
                    alert(`An error occurred: ${error.message}`);
                    console.error('Error details:', error);
                } finally {
                    setIsLoading(false);
                }
            },
            (error) => {
                setIsLoading(false);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Geolocation request denied. Please reset location permission to grant access again.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        alert("The request to get user location timed out.");
                        break;
                    default:
                        alert("An unknown error occurred while requesting location.");
                        break;
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
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && !isLoading && handleSearch()}
            />
            <button className="search-btn" onClick={handleSearch} disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>
            <div className="separator"></div>
            <button className="location-btn" onClick={handleLocationClick} disabled={isLoading}>
                {isLoading ? 'Locating...' : 'Use Current Location'}
            </button>
        </div>
    );
}

export default WeatherInput;
