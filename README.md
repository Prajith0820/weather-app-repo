# 🌤️ Beautiful Weather App

A stunning, fully responsive weather application that provides real-time weather information based on user location. Built with vanilla HTML, CSS, and JavaScript, featuring a modern glassmorphism design inspired by contemporary weather apps.

![Weather App Preview](https://img.shields.io/badge/Status-Active-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🎯 Core Functionality
- **📍 Automatic Location Detection**: Uses browser geolocation API to detect user location
- **🌡️ Real-time Weather Data**: Fetches current weather conditions from OpenWeatherMap API
- **📊 Hourly Forecast**: 24-hour forecast with precipitation probability charts
- **🌅 Sunrise & Sunset Times**: Display daily sun times
- **🔄 Auto-refresh**: Updates time every minute automatically

### 📱 Weather Details
- **Temperature**: Current temperature and "feels like" temperature
- **Humidity**: With good/normal/bad indicators
- **Wind**: Speed and direction with animated compass
- **Precipitation**: Rain/snow amount with visual charts
- **UV Index**: With safety level indicators (low to extreme)
- **Rain Chance**: Probability percentage with visual bar

### 🎨 Design Features
- **Glassmorphism UI**: Modern, translucent card designs
- **Gradient Backgrounds**: Beautiful blue gradient matching weather conditions
- **Smooth Animations**: Fade-in, slide, and float effects
- **Weather Icons**: SVG icons that change based on conditions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **City Illustration**: Animated building skyline with floating sun/moon

### 🌈 Dynamic Elements
- **Weather-based Backgrounds**: Changes based on weather conditions
- **Animated Weather Icons**: Floating and pulsing effects
- **Interactive Charts**: Hourly precipitation and wind direction
- **Real-time Updates**: Date and time automatically update

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- A free OpenWeatherMap API key

### Installation

1. **Clone or Download** this repository to your local machine:
```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

2. **Get Your Free API Key**:
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Navigate to API Keys section
   - Copy your API key

3. **Configure the App**:
   - Open `script.js` in your text editor
   - Find line 2: `API_KEY: 'YOUR_OPENWEATHERMAP_API_KEY'`
   - Replace `'YOUR_OPENWEATHERMAP_API_KEY'` with your actual API key:
   ```javascript
   const CONFIG = {
       API_KEY: 'abc123def456ghi789jkl', // Your actual API key here
       API_BASE_URL: 'https://api.openweathermap.org/data/2.5',
       DEFAULT_CITY: 'New York',
       UNITS: 'metric' // Use 'metric' for Celsius, 'imperial' for Fahrenheit
   };
   ```

4. **Launch the App**:
   - Open `index.html` in your web browser
   - Allow location access when prompted
   - Enjoy your personalized weather app!

## 📖 Usage

### First Time Setup
1. When you first open the app, it will request location permission
2. Click "Allow" to get weather for your current location
3. If you deny permission, the app will show weather for New York (default)

### Changing Location
- **Click the location button** (🔘) in the top-left to refresh your location
- **Click on the city name** to manually enter a different city

### Personalizing
- **Click on your name** (top-right) to change the displayed name
- Your name preference is saved in browser storage

### Understanding the Display

#### Main Weather Panel (Left)
- **Current Temperature**: Large display with weather icon
- **Location**: City name and country
- **Sun Times**: Sunrise and sunset times
- **City Illustration**: Animated skyline view

#### Hourly Forecast (Top-Right)
- **Time Slots**: Shows weather for next 24 hours
- **Weather Icons**: Visual representation of conditions
- **Temperature**: Hourly temperature readings
- **Precipitation**: Blue bars show rain/snow probability

#### Detailed Weather Cards (Bottom-Right)
1. **Humidity Card**: Shows percentage with good/normal/bad indicator
2. **Wind Card**: Speed in km/h with directional compass
3. **Precipitation Card**: Total amount expected with bar chart
4. **UV Index Card**: Current UV level with safety warnings
5. **Feels Like Card**: Actual temperature perception
6. **Rain Chance Card**: Probability of precipitation

## 🎨 Customization

### Changing Temperature Units
Edit `CONFIG.UNITS` in `script.js`:
```javascript
UNITS: 'metric'   // For Celsius
UNITS: 'imperial' // For Fahrenheit
```

### Changing Default City
Edit `CONFIG.DEFAULT_CITY` in `script.js`:
```javascript
DEFAULT_CITY: 'London' // Any city name
```

### Customizing Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-blue: #5B9FED;      /* Main blue color */
    --secondary-blue: #7FB5F5;    /* Secondary blue */
    --light-blue: #A3C9F7;        /* Light blue accents */
    /* ... more variables */
}
```

### Adding Dark Mode
The app includes dark mode CSS. To enable it, add this to your JavaScript:
```javascript
document.body.classList.add('dark-mode');
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

The app automatically adjusts layout and sizing for optimal viewing on any device.

## 🔧 Troubleshooting

### Weather Data Not Loading
1. **Check API Key**: Ensure you've added your OpenWeatherMap API key in `script.js`
2. **API Key Activation**: New API keys can take up to 2 hours to activate
3. **Check Console**: Open browser DevTools (F12) and check Console tab for errors
4. **Internet Connection**: Verify you have an active internet connection

### Location Not Working
1. **Browser Permissions**: Check if location access is blocked in browser settings
2. **HTTPS Required**: Geolocation API requires HTTPS (or localhost for testing)
3. **Fallback**: If location fails, app automatically shows default city weather

### Display Issues
1. **Clear Cache**: Try clearing browser cache and reloading
2. **Browser Support**: Use latest version of Chrome, Firefox, Safari, or Edge
3. **Console Errors**: Check browser console for any error messages

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 📚 API Documentation

This app uses the following OpenWeatherMap APIs:
- **Current Weather API**: Real-time weather data
- **5-Day Forecast API**: Hourly forecast data
- **Geocoding API**: Convert city names to coordinates
- **Air Quality API**: UV index and air quality data (optional)

**API Limits** (Free Tier):
- 60 calls per minute
- 1,000,000 calls per month

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

### Ideas for Contributions
- Add 7-day forecast view
- Implement weather alerts
- Add weather radar maps
- Create unit tests
- Add more weather animations
- Implement PWA features (offline support)
- Add multiple language support

## 📄 License

This project is licensed under the MIT License - feel free to use it for personal or commercial projects.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons: Custom SVG weather icons
- Fonts: [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)
- Design inspiration: Modern weather apps and glassmorphism trends

## 📞 Support

If you encounter any issues or have questions:
- Check the [Troubleshooting](#-troubleshooting) section
- Open an issue on GitHub
- Contact: your-email@example.com

## 🎯 Future Enhancements

- [ ] Weather alerts and notifications
- [ ] Historical weather data
- [ ] Weather maps integration
- [ ] Multiple location management
- [ ] Weather widgets for embedding
- [ ] Social sharing features
- [ ] Progressive Web App (PWA) support
- [ ] Voice assistant integration

## 📸 Screenshots

### Desktop View
Beautiful full-featured layout with all weather details displayed elegantly.

### Mobile View
Responsive design that stacks elements vertically for optimal mobile experience.

### Tablet View
Hybrid layout that balances information density with usability.

---

**Made with ❤️ and ☕**

*Stay informed, stay prepared, stay beautiful with our Weather App!*

## 🎓 Learning Resources

If you want to learn more about the technologies used:
- [HTML5 Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS3 Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

---

**Version**: 1.0.0  
**Last Updated**: October 2025
