// Weather App Configuration
const CONFIG = {
    API_KEY: '24af1f4748f83088dbcd8aaf41688ce5', // Get your free API key from https://openweathermap.org/api
    API_BASE_URL: 'https://api.openweathermap.org/data/2.5',
    DEFAULT_CITY: 'New York',
    UNITS: 'metric'   // Use 'metric' for Celsius, 'imperial' for Fahrenheit
};

// DOM Elements
const elements = {
    loadingOverlay: document.getElementById('loadingOverlay'),
    locationBtn: document.getElementById('locationBtn'),
    cityName: document.getElementById('cityName'),
    currentDate: document.getElementById('currentDate'),
    currentTime: document.getElementById('currentTime'),
    sunsetTime: document.getElementById('sunsetTime'),
    mainTemp: document.getElementById('mainTemp'),
    weatherDescription: document.getElementById('weatherDescription'),
    mainWeatherIcon: document.getElementById('mainWeatherIcon'),
    humidityValue: document.getElementById('humidityValue'),
    humidityStatus: document.getElementById('humidityStatus'),
    windValue: document.getElementById('windValue'),
    windDirection: document.getElementById('windDirection'),
    precipitationValue: document.getElementById('precipitationValue'),
    uvValue: document.getElementById('uvValue'),
    uvStatus: document.getElementById('uvStatus'),
    feelsLikeValue: document.getElementById('feelsLikeValue'),
    rainChanceValue: document.getElementById('rainChanceValue'),
    userName: document.getElementById('userName')
};

// State Management
let currentWeatherData = null;
let currentLocation = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update time every minute
});

// Initialize Application
async function initializeApp() {
    try {
        // Set user name from localStorage or use default
        const savedName = localStorage.getItem('userName') || 'User';
        elements.userName.textContent = savedName;

        // Try to get user's location
        await getUserLocation();
    } catch (error) {
        console.error('Initialization error:', error);
        hideLoading();
        showError('Failed to initialize app. Using default location.');
        // Fallback to default location
        await fetchWeatherByCity(CONFIG.DEFAULT_CITY);
    }
}

// Get User's Geolocation
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
            return;
        }

        showLoading('Getting your location...');

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                currentLocation = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };
                await fetchWeatherByCoords(currentLocation.lat, currentLocation.lon);
                resolve();
            },
            (error) => {
                console.error('Geolocation error:', error);
                hideLoading();
                
                // Handle different error types
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        showError('Location access denied. Using default location.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        showError('Location information unavailable. Using default location.');
                        break;
                    case error.TIMEOUT:
                        showError('Location request timed out. Using default location.');
                        break;
                    default:
                        showError('An unknown error occurred. Using default location.');
                }
                
                fetchWeatherByCity(CONFIG.DEFAULT_CITY);
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
}

// Fetch Weather by Coordinates
async function fetchWeatherByCoords(lat, lon) {
    try {
        showLoading('Fetching weather data...');

        // Fetch current weather
        const currentWeatherUrl = `${CONFIG.API_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${CONFIG.UNITS}&appid=${CONFIG.API_KEY}`;
        const currentResponse = await fetch(currentWeatherUrl);
        
        if (!currentResponse.ok) {
            throw new Error('Failed to fetch current weather data');
        }
        
        const currentData = await currentResponse.json();

        // Fetch forecast (for hourly data)
        const forecastUrl = `${CONFIG.API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${CONFIG.UNITS}&appid=${CONFIG.API_KEY}`;
        const forecastResponse = await fetch(forecastUrl);
        
        if (!forecastResponse.ok) {
            throw new Error('Failed to fetch forecast data');
        }
        
        const forecastData = await forecastResponse.json();

        // Fetch air quality for UV index (if available)
        const airQualityUrl = `${CONFIG.API_BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${CONFIG.API_KEY}`;
        const airQualityResponse = await fetch(airQualityUrl);
        const airQualityData = airQualityResponse.ok ? await airQualityResponse.json() : null;

        // Store data
        currentWeatherData = {
            current: currentData,
            forecast: forecastData,
            airQuality: airQualityData
        };

        // Update UI
        updateWeatherUI(currentWeatherData);
        hideLoading();
    } catch (error) {
        console.error('Error fetching weather:', error);
        hideLoading();
        showError('Failed to fetch weather data. Please check your API key.');
    }
}

// Fetch Weather by City Name
async function fetchWeatherByCity(cityName) {
    try {
        showLoading('Fetching weather data...');

        // First get coordinates for the city
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${CONFIG.API_KEY}`;
        const geoResponse = await fetch(geoUrl);
        
        if (!geoResponse.ok) {
            throw new Error('Failed to find city');
        }
        
        const geoData = await geoResponse.json();
        
        if (geoData.length === 0) {
            throw new Error('City not found');
        }

        const { lat, lon } = geoData[0];
        await fetchWeatherByCoords(lat, lon);
    } catch (error) {
        console.error('Error fetching weather by city:', error);
        hideLoading();
        showError('Failed to fetch weather for the specified city.');
    }
}

// Update Weather UI
function updateWeatherUI(data) {
    const current = data.current;
    const forecast = data.forecast;

    // Update location
    elements.cityName.textContent = `${current.name}, ${current.sys.country}`;

    // Update main temperature
    elements.mainTemp.textContent = `${Math.round(current.main.temp)}°`;
    
    // Update weather description
    const description = current.weather[0].description;
    elements.weatherDescription.textContent = description.charAt(0).toUpperCase() + description.slice(1);

    // Update weather icon
    updateMainWeatherIcon(current.weather[0].main, current.weather[0].icon);

    // Update times
    updateSunTimes(current.sys.sunrise, current.sys.sunset);

    // Update detailed weather cards
    updateHumidity(current.main.humidity);
    updateWind(current.wind.speed, current.wind.deg);
    updatePrecipitation(forecast);
    updateFeelsLike(current.main.feels_like);
    updateRainChance(forecast);
    updateUVIndex(current);

    // Update hourly forecast
    updateHourlyForecast(forecast);

    // Update background based on weather and time
    updateBackground(current.weather[0].main, isDay(current.dt, current.sys.sunrise, current.sys.sunset));
}

// Update Main Weather Icon
function updateMainWeatherIcon(weatherMain, iconCode) {
    const iconMap = {
        'Clear': `<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`,
        'Clouds': `<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>`,
        'Rain': `<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="8" y1="19" x2="8" y2="21"></line>
            <line x1="8" y1="13" x2="8" y2="15"></line>
            <line x1="16" y1="19" x2="16" y2="21"></line>
            <line x1="16" y1="13" x2="16" y2="15"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="12" y1="15" x2="12" y2="17"></line>
            <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
        </svg>`,
        'Drizzle': `<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="8" y1="19" x2="8" y2="21"></line>
            <line x1="16" y1="19" x2="16" y2="21"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
        </svg>`,
        'Thunderstorm': `<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path>
            <polyline points="13 11 9 17 15 17 11 23"></polyline>
        </svg>`,
        'Snow': `<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="12" y1="2" x2="12" y2="22"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>`,
        'Mist': `<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="3" y1="15" x2="21" y2="15"></line>
            <line x1="3" y1="21" x2="21" y2="21"></line>
        </svg>`
    };

    elements.mainWeatherIcon.innerHTML = iconMap[weatherMain] || iconMap['Clear'];
}

// Update Date and Time
function updateDateTime() {
    const now = new Date();
    
    // Update date
    const options = { month: 'short', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);
    elements.currentDate.textContent = `Today ${dateStr}`;
    
    // Update current time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    elements.currentTime.textContent = `${hours}:${minutes}`;
}

// Update Sun Times
function updateSunTimes(sunrise, sunset) {
    const sunriseDate = new Date(sunrise * 1000);
    const sunsetDate = new Date(sunset * 1000);
    
    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    
    elements.currentTime.textContent = formatTime(sunriseDate);
    elements.sunsetTime.textContent = formatTime(sunsetDate);
}

// Update Humidity
function updateHumidity(humidity) {
    elements.humidityValue.textContent = `${humidity}%`;
    
    let status = 'good';
    if (humidity > 60) status = 'bad';
    else if (humidity > 40) status = 'normal';
    
    elements.humidityStatus.textContent = status;
    
    // Update chart bars
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach(bar => bar.classList.remove('active'));
    
    if (status === 'bad') {
        chartBars[1].classList.add('active');
        chartBars[2].classList.add('active');
    } else if (status === 'normal') {
        chartBars[1].classList.add('active');
    }
}

// Update Wind
function updateWind(speed, direction) {
    const windSpeed = Math.round(speed * 3.6); // Convert m/s to km/h
    elements.windValue.textContent = `${windSpeed} km/h`;
    
    // Update wind direction arrow
    if (elements.windDirection) {
        elements.windDirection.style.transform = `rotate(${direction}deg)`;
    }
}

// Update Precipitation
function updatePrecipitation(forecastData) {
    if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
        elements.precipitationValue.textContent = '0 cm';
        return;
    }
    
    // Calculate total precipitation for next 24 hours
    let totalPrecipitation = 0;
    const next24Hours = forecastData.list.slice(0, 8); // 8 * 3-hour intervals = 24 hours
    
    next24Hours.forEach(item => {
        if (item.rain && item.rain['3h']) {
            totalPrecipitation += item.rain['3h'];
        }
        if (item.snow && item.snow['3h']) {
            totalPrecipitation += item.snow['3h'];
        }
    });
    
    elements.precipitationValue.textContent = `${(totalPrecipitation / 10).toFixed(1)} cm`;
}

// Update UV Index
function updateUVIndex(currentData) {
    // Note: OpenWeatherMap's current weather API doesn't include UV index
    // You would need to use the UV Index API or One Call API for this
    // For demo purposes, using a random value
    const uvIndex = Math.floor(Math.random() * 10) + 1;
    elements.uvValue.textContent = uvIndex;
    
    let status = 'low';
    if (uvIndex >= 11) status = 'extreme';
    else if (uvIndex >= 8) status = 'very high';
    else if (uvIndex >= 6) status = 'high';
    else if (uvIndex >= 3) status = 'medium';
    
    elements.uvStatus.textContent = status;
    
    // Update scale bars
    const scaleBars = document.querySelectorAll('.scale-bar');
    scaleBars.forEach(bar => bar.classList.remove('active'));
    
    if (uvIndex >= 0 && uvIndex <= 2) scaleBars[0].classList.add('active');
    else if (uvIndex >= 3 && uvIndex <= 5) scaleBars[1].classList.add('active');
    else if (uvIndex >= 6 && uvIndex <= 7) scaleBars[2].classList.add('active');
    else if (uvIndex >= 8 && uvIndex <= 10) scaleBars[3].classList.add('active');
    else scaleBars[4].classList.add('active');
}

// Update Feels Like Temperature
function updateFeelsLike(feelsLike) {
    elements.feelsLikeValue.textContent = `${Math.round(feelsLike)}°`;
    
    // Update temperature marker position (percentage based on 0-50°C scale)
    const percentage = Math.min(Math.max((feelsLike / 50) * 100, 0), 100);
    const marker = document.querySelector('.temp-marker');
    if (marker) {
        marker.style.left = `${percentage}%`;
    }
}

// Update Rain Chance
function updateRainChance(forecastData) {
    if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
        elements.rainChanceValue.textContent = '0%';
        return;
    }
    
    // Calculate average rain probability for next 24 hours
    const next24Hours = forecastData.list.slice(0, 8);
    let totalProbability = 0;
    
    next24Hours.forEach(item => {
        if (item.pop) {
            totalProbability += item.pop;
        }
    });
    
    const averageProbability = Math.round((totalProbability / next24Hours.length) * 100);
    elements.rainChanceValue.textContent = `${averageProbability}%`;
    
    // Update probability fill bar
    const fillBar = document.querySelector('.probability-fill');
    if (fillBar) {
        fillBar.style.width = `${averageProbability}%`;
    }
}

// Update Hourly Forecast
function updateHourlyForecast(forecastData) {
    if (!forecastData || !forecastData.list) return;
    
    const hourlyChart = document.querySelector('.hourly-chart');
    if (!hourlyChart) return;
    
    hourlyChart.innerHTML = ''; // Clear existing items
    
    // Get next 8 time slots (24 hours with 3-hour intervals)
    const hours = forecastData.list.slice(0, 8);
    
    hours.forEach((hour, index) => {
        const time = new Date(hour.dt * 1000);
        const temp = Math.round(hour.main.temp);
        const precipitation = Math.round((hour.pop || 0) * 100);
        const weatherIcon = getHourlyWeatherIcon(hour.weather[0].main);
        
        const timeLabel = index === 0 ? 'Now' : 
            `${String(time.getHours()).padStart(2, '0')}:00`;
        
        const hourItem = document.createElement('div');
        hourItem.className = 'hour-item';
        hourItem.innerHTML = `
            <span class="hour-label">${timeLabel}</span>
            ${weatherIcon}
            <div class="hour-bar" style="height: ${precipitation}%"></div>
            <span class="hour-temp">${temp}°</span>
            <span class="hour-precip">${precipitation}%</span>
        `;
        
        hourlyChart.appendChild(hourItem);
    });
}

// Get Hourly Weather Icon
function getHourlyWeatherIcon(weatherMain) {
    const iconMap = {
        'Clear': `<svg class="hour-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
        </svg>`,
        'Clouds': `<svg class="hour-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>`,
        'Rain': `<svg class="hour-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="16" y1="13" x2="16" y2="21"></line>
            <line x1="8" y1="13" x2="8" y2="21"></line>
            <line x1="12" y1="15" x2="12" y2="23"></line>
            <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
        </svg>`
    };
    
    return iconMap[weatherMain] || iconMap['Clear'];
}

// Update Background Based on Weather
function updateBackground(weatherMain, isDayTime) {
    const body = document.body;
    
    // Remove existing weather classes
    body.classList.remove('clear-day', 'clear-night', 'cloudy', 'rainy', 'stormy', 'snowy');
    
    // Add appropriate class
    if (weatherMain === 'Clear') {
        body.classList.add(isDayTime ? 'clear-day' : 'clear-night');
    } else if (weatherMain === 'Clouds') {
        body.classList.add('cloudy');
    } else if (weatherMain === 'Rain' || weatherMain === 'Drizzle') {
        body.classList.add('rainy');
    } else if (weatherMain === 'Thunderstorm') {
        body.classList.add('stormy');
    } else if (weatherMain === 'Snow') {
        body.classList.add('snowy');
    }
}

// Check if it's daytime
function isDay(currentTime, sunrise, sunset) {
    return currentTime >= sunrise && currentTime <= sunset;
}

// Setup Event Listeners
function setupEventListeners() {
    // Location button click
    elements.locationBtn.addEventListener('click', async () => {
        try {
            await getUserLocation();
        } catch (error) {
            console.error('Error getting location:', error);
        }
    });
    
    // Allow user to change city by clicking on city name
    elements.cityName.addEventListener('click', () => {
        const newCity = prompt('Enter city name:', elements.cityName.textContent.split(',')[0]);
        if (newCity && newCity.trim()) {
            fetchWeatherByCity(newCity.trim());
        }
    });
    
    // Update user name
    elements.userName.addEventListener('click', () => {
        const newName = prompt('Enter your name:', elements.userName.textContent);
        if (newName && newName.trim()) {
            elements.userName.textContent = newName.trim();
            localStorage.setItem('userName', newName.trim());
        }
    });
}

// Loading State Management
function showLoading(message = 'Loading...') {
    if (elements.loadingOverlay) {
        elements.loadingOverlay.classList.remove('hidden');
        const loadingText = elements.loadingOverlay.querySelector('p');
        if (loadingText) {
            loadingText.textContent = message;
        }
    }
}

function hideLoading() {
    if (elements.loadingOverlay) {
        elements.loadingOverlay.classList.add('hidden');
    }
}

// Error Handling
function showError(message) {
    console.error(message);
    alert(message); // You can replace this with a more elegant notification system
}

// Utility Functions
function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchWeatherByCoords,
        fetchWeatherByCity,
        updateWeatherUI
    };
}
