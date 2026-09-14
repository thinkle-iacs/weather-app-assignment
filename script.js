// Get elements we need for our action
const zipInput = document.querySelector("#zip-code");
const statusElement = document.querySelector("#status");
const weatherSection = document.querySelector("#weather");
const rawDataElement = document.querySelector("#raw-data");

// Get our buttons that trigger stuff...
const zipButton = document.querySelector("#get-zip-button");
const hourlyButton = document.querySelector("#get-hourly-button")
const forecastButton = document.querySelector("#get-forecast-button");

// Define the variables we need...
let thePlace; // where the forecast is for
let weatherData; // weather data
let forecastUrl; // where to get the forecast
let hourlyForecastUrl; // where to get the hourly forecast


zipButton.addEventListener(
  // When the user clicks the zip button
  "click",
  // Do this...
  async function () {
    // Get the zip code from the zip input
    const zipCode = zipInput.value.trim();

    // Make the statusElement show we are working...
    statusElement.textContent = `Finding the forecast for ${zipCode}…`;



    // Attempt to load location data from zip code
    try {
      // Request 1: translate a human-friendly ZIP code into coordinates.
      const zipCodeResponse = await fetch(`https://api.zippopotam.us/us/${zipCode}`)
      const zipCodeJson = await zipCodeResponse.json();
      console.log('Got zipCode response', zipCodeJson);
      thePlace = zipCodeJson.places[0]; // read the first place from the response
    } catch (error) {
      console.error(error);
      statusElement.textContent = `Error getting zip code: ${error}`
      return; // Give up, we failed!
    }
    // Request 2: ask NWS which grid and forecast URLs serve those coordinates.
    try {
      const response = await fetch(`https://api.weather.gov/points/${thePlace.latitude},${thePlace.longitude}`);
      const data = await response.json();
      console.log('Got response from weather.gov: ', data);
      forecastUrl = data.properties.forecast;
      hourlyForecastUrl = data.properties.forecastHourly;
    } catch (error) {
      console.error('Error fetching weather.gov', error);
      statusElement.textContent = `Error getting weather data: ${error}`

    }
    // Activate the buttons if we found a URL for the forecast
    if (forecastUrl) {
      forecastButton.disabled = false;
    } else {
      forecastButton.disabled = true;
    }
    if (hourlyForecastUrl) {
      hourlyButton.disabled = false;
    } else {
      hourlyButton.disabled = true;
    }
  }
);

forecastButton.addEventListener(
  // When the forecast button is clicked...
  "click", async function () {
    const response = await fetch(forecastUrl);
    const data = await response.json();
    rawDataElement.textContent = JSON.stringify(data, null, 2);
  }
);

hourlyButton.addEventListener(
  // When the hourly button is clicked
  "click", async function () {
    const response = await fetch(hourlyForecastUrl);
    const data = await response.json();
    rawDataElement.textContent = JSON.stringify(data, null, 2);
  }
)

// AI-generated code starts here
// Teacher prompt: Remove the finished forecast design and display raw JSON for students to use.
function renderForecast({ weatherData }) {
  // Replace this raw output with your own selection and presentation of the data.
  rawDataElement.textContent = JSON.stringify(weatherData, null, 2);
  statusElement.textContent = "Forecast data loaded.";
  weatherSection.hidden = false;
}

// AI-generated code ends here
