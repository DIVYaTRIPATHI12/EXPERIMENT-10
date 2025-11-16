const apiKey = '792777bba5403c3c59402a461c0185dc'; 
// Event listener for the button
document.getElementById('get-weather').addEventListener('click', () => {
  const city = document.getElementById('city-input').value.trim();
  if (city) {
    fetchWeather(city);
  }
});

// Function to fetch weather data from OpenWeatherMap API
function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      document.getElementById('weather-display').innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

// Function to display weather info on the page
function displayWeather(data) {
  const container = document.getElementById('weather-display');

  const cityName = data.name;
  const temp = data.main.temp;
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  // Change background color based on weather description
  if (description.includes('clear')) {
    document.body.style.backgroundColor = 'skyblue'; // clear sky
  } else if (description.includes('rain')) {
    document.body.style.backgroundColor = 'gray'; // rainy
  } else if (description.includes('snow')) {
    document.body.style.backgroundColor = 'white'; // snow
  } else if (description.includes('storm') || description.includes('thunder')) {
    document.body.style.backgroundColor = 'purple'; // stormy
  } else {
    document.body.style.backgroundColor = 'orange'; // other weather
  }

  // Show the weather info
  container.innerHTML = `
    <h2>Weather in ${cityName}</h2>
    <img src="${iconUrl}" alt="${description}">
    <p><strong>Temperature:</strong> ${temp}°C</p>
    <p><strong>Description:</strong> ${description}</p>
    <p><strong>Humidity:</strong> ${humidity}%</p>
    <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
  `;
}