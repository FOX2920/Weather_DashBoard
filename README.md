
# Weather Dashboard

## Overview

This project is a weather dashboard application that allows users to search for weather information by city or country. The application provides current weather details, a 4-day weather forecast with an option to load more days, and the ability to save and view temporary weather history. Users can also subscribe or unsubscribe to receive daily weather forecast emails.

## Features

- **API Processing**: All API calls and processing are handled on the backend using Python.
- **Search Functionality**: Users can search for a city or country to view weather information.
  - **Current Weather**: Displays temperature, wind speed, humidity, and other relevant weather details for the present day.
  - **Weather Forecast**: Shows a 4-day weather forecast with an option to load more days.
- **Weather History**: Saves temporary weather information history that can be accessed again during the same day.
- **Email Notifications**: Users can register and unsubscribe to receive daily weather forecast information via email. Email confirmation is required.
- **Deployment**: The application is deployed and live.

## Project Structure

```
Weather-dashboard/
├── back_end/
│   ├── app.py
│   ├── requirements.txt
├── front end/
│   ├── build/
│   ├── package.json
│   ├── src/
│   ├── public/
├── .gitignore
├── README.md
```

## Installation

### Backend

1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```

2. Create a virtual environment:
   ```sh
   python -m venv venv
   ```

3. Activate the virtual environment:

   On Windows:
   ```sh
   venv\Scripts\activate
   ```

   On macOS/Linux:
   ```sh
   source venv/bin/activate
   ```

4. Install the required packages:
   ```sh
   pip install -r requirements.txt
   ```

5. Run the backend server:
   ```sh
   python app.py
   ```

### Frontend

1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```

2. Install the required packages:
   ```sh
   npm install
   ```

3. Start the frontend development server:
   ```sh
   npm start
   ```

## Deployment

### Backend

Follow the steps to deploy the backend to your preferred cloud service (e.g., Heroku, AWS, etc.).

### Frontend

Build the frontend for production:

```sh
npm run build
```

Deploy the contents of the `build` directory to your preferred hosting service (e.g., Netlify, Vercel, etc.).

## Contributing

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## Demo

Check out the live demo in this [link](https://weather-dash-board-nine.vercel.app/).

## Contact

For any questions or suggestions, please reach out to me [here](mailto:21522557@gm.edu.vn)
.

