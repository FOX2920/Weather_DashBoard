import React, { useState } from 'react';

const API_BASE_URL = "http://localhost:8080"; // Đã được định nghĩa đúng

function EmailSubscription() {
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/weather_mail?city=${city}&email=${email}`);
            const data = await response.json();
            if (response.ok) {
                setSubscribed(true);
                alert(data.message);
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };

    const handleUnsubscribe = () => {
        setSubscribed(false);
        setEmail('');
        setCity('');
        alert('You have been unsubscribed from daily weather forecasts.');
    };

    // Phần return giữ nguyên

    return (
        <div className="email-subscription">
            <h3>Daily Weather Forecast</h3>
            {!subscribed ? (
                <form onSubmit={handleSubscribe}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter your city"
                        required
                    />
                    <button type="submit">Subscribe</button>
                </form>
            ) : (
                <div>
                    <p>You are subscribed with: {email}</p>
                    <button onClick={handleUnsubscribe}>Unsubscribe</button>
                </div>
            )}
        </div>
    );
}

export default EmailSubscription;