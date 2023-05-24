// Get references to HTML elements
const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');

// Add event listener to form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    const cityName = cityInput.value.trim();

    if (cityName !== '') {
        fetchWeatherData(cityName);
        fetchForecastData(cityName);
        cityInput.value = ''; // Clear the input field
    }
});

// Function to fetch weather data from OpenWeatherMap API
function fetchWeatherData(city) {
    const apiKey = '8e33f07f7743b2fbacae315811d5fa7e';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    // Make a fetch request to the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Process the retrieved data and update the weather display
            updateWeatherDisplay(data);
        })
        .catch(error => {
            console.log('Error:', error);
            // Display an error message to the console
        });
}

// Function to fetch forecast data from OpenWeatherMap API
function fetchForecastData(city) {
    const apiKey = '8e33f07f7743b2fbacae315811d5fa7e';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

    // Make a fetch request to the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Process the retrieved data and update the weather display
            updateForecastDisplay(data);
        })
        .catch(error => {
            console.log('Error:', error);
            // Display an error message to the console
        });
}

// Function to update the weather display with the retrieved data
function updateWeatherDisplay(weatherData) {
    // Extract the necessary information from the weatherData object
    const cityName = weatherData.name;
    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;

    // Update the HTML elements with the retrieved weather information
    document.getElementById('city-name').textContent = cityName;
    document.getElementById('temperature').textContent = `Temperature: ${temperature} °F`;
    document.getElementById('description').textContent = `Description: ${description}`;
}

// Function to update the forecast display with the retrieved data
function updateForecastDisplay(weatherData) {
    // Extract the necessary information from the weatherData object
    // const cityName = weatherData.name;
    // const temperature = weatherData.main.temp;
    // const description = weatherData.weather[0].description;
    for (let i = 0; i < 40; i += 8) {
        console.log(weatherData.list[i].main.temp);
        console.log(weatherData.list[i].weather[0].description);
    }

    // Update the HTML elements with the retrieved weather information
    //document.getElementById('city-name').textContent = cityName;
    //document.getElementById('temperature').textContent = `Temperature: ${temperature} °F`;
    //document.getElementById('description').textContent = `Description: ${description}`;
}
