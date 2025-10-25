# 🌤️ Weather App

A modern, responsive weather application that displays real-time weather information based on user location. Features a beautiful glassmorphism design with gradient backgrounds and smooth animations.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Setup Instructions](#-setup-instructions)
- [How It Works](#-how-it-works)
- [API Integration](#-api-integration)
- [Customization](#-customization)
- [Browser Compatibility](#-browser-compatibility)
- [License](#-license)

## ✨ Features

### Weather Information Display
- **Current Temperature** - Large display showing current temperature in Celsius
- **Weather Conditions** - Descriptive text with appropriate weather icons
- **Location Display** - Shows city name and country code
- **Sunrise/Sunset Times** - Displays sun times for the current location
- **Hourly Forecast** - 24-hour forecast with 3-hour intervals showing:
  - Time slots (Now, 11:00, 12:00, etc.)
  - Weather icons for each time slot
  - Temperature readings
  - Precipitation probability percentages
  - Visual bar chart for precipitation

### Detailed Weather Metrics
The app displays 6 weather detail cards:

1. **Humidity Card**
   - Percentage display (e.g., 82%)
   - Status indicator (good/normal/bad)
   - Visual bar chart with 3 levels

2. **Wind Card**
   - Wind speed in km/h
   - Animated compass showing wind direction
   - Directional arrow that rotates based on wind angle

3. **Precipitation Card**
   - Total precipitation amount in cm
   - Bar chart showing precipitation distribution
   - Calculates next 24 hours of rain/snow

4. **UV Index Card**
   - Numerical UV index value (0-11+)
   - Status label (low/medium/high/very high/extreme)
   - Color-coded scale bars showing current level

5. **Feels Like Card**
   - "Feels like" temperature
   - Visual temperature scale (0-50°C)
   - Moving marker indicating current position

6. **Chance of Rain Card**
   - Percentage probability
   - Progress bar visualization
   - Labels from 0% to 100%

### User Interface Elements
- **Welcome Header** - Personalized greeting with user name
- **Avatar Display** - User avatar image (from DiceBear API)
- **Location Button** - Refresh location and reload weather data
- **Menu Button** - UI placeholder for future navigation
- **Interactive City Name** - Click to manually enter different city
- **Animated City Illustration** - Decorative skyline with buildings and sun
- **Loading Overlay** - Shows while fetching location/data

### Design Features
- **Glassmorphism Effects** - Frosted glass appearance on cards
- **Gradient Backgrounds** - Beautiful blue gradient (#6BA5F0 to #9EC8F9)
- **Smooth Animations** - Fade-in, slide, float, and pulse effects
- **Responsive Layout** - Adapts to desktop, tablet, and mobile screens
- **Custom SVG Icons** - Weather-specific icons for all conditions
- **Dynamic Styling** - Elements change based on weather conditions

## 📁 Project Structure

```
weather-app/
├── index.html          # Main HTML structure with semantic markup
├── style.css           # Complete styling with animations and responsive design
├── script.js           # JavaScript functionality and API integration
└── README.md          # Project documentation
```

### File Descriptions

**index.html** (416 lines)
- Semantic HTML5 structure
- Header with location/menu buttons and user info
- Two-panel layout (current weather + detailed info)
- Hourly forecast section with 8 time slots
- 6 detailed weather cards with charts/graphs
- Loading overlay with spinner animation
- Google Fonts (Poppins) integration

**style.css** (658 lines)
- CSS custom properties for theming
- Glassmorphism and gradient designs
- Complete responsive breakpoints
- Keyframe animations (fadeIn, slideUp, float, pulse, spin)
- Grid and flexbox layouts
- Weather-specific styling
- Dark mode support (optional)
- Print styles
- Accessibility features

**script.js** (579 lines)
- Configuration object for API settings
- DOM element references
- Geolocation API integration
- OpenWeatherMap API calls (Current Weather, Forecast, Geocoding)
- Data fetching and error handling
- UI update functions for all weather metrics
- Event listeners for user interactions
- LocalStorage for user preferences
- Utility functions for formatting

## �️ Technologies Used

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with:
  - CSS Grid & Flexbox
  - CSS Variables
  - Animations & Transitions
  - Media Queries
  - Backdrop Filter (glassmorphism)
- **Vanilla JavaScript (ES6+)** - No frameworks, pure JS
  - Async/Await
  - Fetch API
  - DOM Manipulation
  - LocalStorage API
  - Geolocation API

### External APIs
- **OpenWeatherMap API** - Weather data provider
  - Current Weather Data API
  - 5 Day / 3 Hour Forecast API
  - Geocoding API
  - Air Pollution API (optional)
- **DiceBear Avatars API** - User avatar generation
- **Google Fonts API** - Poppins font family

### Design Tools
- **SVG** - Custom inline weather icons
- **CSS Animations** - Smooth transitions and effects
- **Responsive Design** - Mobile-first approach

## 🚀 Setup Instructions

### 1. Get OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. Verify your email address
4. Go to API Keys section in your account
5. Copy your API key (activation takes ~10 minutes to 2 hours)

### 2. Configure the Application

Open `script.js` and locate line 3. Replace the placeholder with your API key:

```javascript
const CONFIG = {
    API_KEY: 'your_actual_api_key_here',  // Replace this
    API_BASE_URL: 'https://api.openweathermap.org/data/2.5',
    DEFAULT_CITY: 'New York',
    UNITS: 'metric'  // 'metric' for Celsius, 'imperial' for Fahrenheit
};
```

### 3. Run the Application

**Option A: Local File**
- Simply open `index.html` in your web browser
- Note: Geolocation may not work with `file://` protocol in some browsers

**Option B: Local Server (Recommended)**
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

### 4. Allow Location Access
When prompted, click "Allow" to enable automatic location detection. If denied, the app defaults to New York weather.

## 🔧 How It Works

### Application Flow

1. **Initialization** (`initializeApp()`)
   - Loads user name from localStorage
   - Requests geolocation permission
   - Fetches weather data for current location

2. **Geolocation** (`getUserLocation()`)
   - Uses browser's Geolocation API
   - Handles permission denied/errors
   - Falls back to default city if needed

3. **Data Fetching** (`fetchWeatherByCoords()`)
   - Calls OpenWeatherMap Current Weather API
   - Calls OpenWeatherMap 5-Day Forecast API
   - Optionally calls Air Pollution API
   - Stores data in `currentWeatherData` object

4. **UI Updates** (`updateWeatherUI()`)
   - Parses API response data
   - Updates all DOM elements
   - Calls specific update functions:
     - `updateMainWeatherIcon()` - Changes main icon
     - `updateHumidity()` - Updates humidity card
     - `updateWind()` - Updates wind card with compass
     - `updatePrecipitation()` - Calculates 24hr precipitation
     - `updateUVIndex()` - Sets UV level (simulated)
     - `updateFeelsLike()` - Updates feels like temperature
     - `updateRainChance()` - Calculates rain probability
     - `updateHourlyForecast()` - Builds hourly chart

5. **Event Handling**
   - Location button: Re-requests user location
   - City name click: Prompts for manual city entry
   - User name click: Updates personalized name

### Key Functions

```javascript
// Main initialization
initializeApp()

// Location handling
getUserLocation()
fetchWeatherByCoords(lat, lon)
fetchWeatherByCity(cityName)

// UI updates
updateWeatherUI(data)
updateMainWeatherIcon(weatherMain, iconCode)
updateDateTime()
updateSunTimes(sunrise, sunset)

// Metric updates
updateHumidity(humidity)
updateWind(speed, direction)
updatePrecipitation(forecastData)
updateUVIndex(currentData)
updateFeelsLike(feelsLike)
updateRainChance(forecastData)
updateHourlyForecast(forecastData)

// Utilities
showLoading(message)
hideLoading()
setupEventListeners()
```

## 🌐 API Integration

### OpenWeatherMap APIs Used

1. **Current Weather API**
   ```
   GET https://api.openweathermap.org/data/2.5/weather
   Parameters: lat, lon, units, appid
   ```
   Returns: Current temperature, conditions, humidity, wind, sunrise/sunset

2. **5-Day Forecast API**
   ```
   GET https://api.openweathermap.org/data/2.5/forecast
   Parameters: lat, lon, units, appid
   ```
   Returns: 3-hour interval forecasts for 5 days (used for 24-hour forecast)

3. **Geocoding API**
   ```
   GET https://api.openweathermap.org/geo/1.0/direct
   Parameters: q (city name), limit, appid
   ```
   Returns: Latitude and longitude for city name

4. **Air Pollution API** (Optional)
   ```
   GET https://api.openweathermap.org/data/2.5/air_pollution
   Parameters: lat, lon, appid
   ```
   Returns: Air quality index and pollutant data

### API Rate Limits (Free Tier)
- **60 calls/minute**
- **1,000,000 calls/month**
- Current app typically makes 2-3 calls per load

## 🎨 Customization

### Change Temperature Units
In `script.js`, line 6:
```javascript
UNITS: 'imperial'  // Fahrenheit instead of Celsius
```

### Change Default City
In `script.js`, line 5:
```javascript
DEFAULT_CITY: 'London'  // Or any city name
```

### Customize Colors
In `style.css`, lines 14-25:
```css
:root {
    --primary-blue: #5B9FED;
    --secondary-blue: #7FB5F5;
    --light-blue: #A3C9F7;
    /* Modify these values */
}
```

### Change User Name
Click on your name in the top-right corner, or modify in browser console:
```javascript
localStorage.setItem('userName', 'Your Name');
```

## 🌍 Browser Compatibility

### Fully Supported
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Required Features
- CSS Grid & Flexbox
- Fetch API
- Async/Await
- Geolocation API
- LocalStorage
- Backdrop Filter (for glassmorphism)

### Responsive Breakpoints
- **1200px+** - Full two-column layout
- **768px - 1199px** - Stacked layout, full-width cards
- **480px - 767px** - Mobile optimized, smaller fonts
- **< 480px** - Compact mobile view

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Made with ❤️ by Prajith0820**

*Last Updated: October 25, 2025*
