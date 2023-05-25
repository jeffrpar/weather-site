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
        // createCityButton(city);
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

// function createCityButton(city) {
//     const cityButtonsContainer = document.getElementById('city-buttons');

//     const button = document.createElement('button');
//     button.textContent = city;
//     button.addEventListener('click', function () {
//         fetchWeatherData(city);
//     });

//     cityButtonsContainer.appendChild(button);
// }

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
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; // Clear previous forecast data

    // Loop through the forecast data for the next five days (assuming data is available)
    for (let i = 0; i < 40; i += 8) {
        // Extract the forecast details
        const temperature = weatherData.list[i].main.temp;
        const description = weatherData.list[i].weather[0].description;

        // Create a forecast item element
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');

        // Populate the forecast item with data
        forecastItem.innerHTML = `
        <p>Temperature: ${temperature.toFixed(1)} °F</p>
        <p>Description: ${description}</p>
      `;

        // Append the forecast item to the forecast container
        forecastContainer.appendChild(forecastItem);
    }
}
