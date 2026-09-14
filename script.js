// Starter scaffold revised by Tom Hinkle with OpenAI Codex; see citations.html.
const form = document.querySelector("#location-form");
const zipInput = document.querySelector("#zip-code");
const statusElement = document.querySelector("#status");
const weatherSection = document.querySelector("#weather");
const rawDataElement = document.querySelector("#raw-data");

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const zipCode = zipInput.value.trim();

  if (!/^\d{5}$/.test(zipCode)) {
    showError("Enter a five-digit U.S. ZIP code.");
    zipInput.focus();
    return;
  }

  showLoading(`Finding the forecast for ${zipCode}…`);

  try {
    // Request 1: translate a human-friendly ZIP code into coordinates.
    const location = await getCoordinatesForZip(zipCode);
    // Request 2: ask NWS which grid and forecast URLs serve those coordinates.
    const point = await getForecastUrls(location.latitude, location.longitude);
    // Request 3: follow the daily forecast URL returned by NWS.
    const weatherData = await getForecast(point.forecastUrl);
    renderForecast({ weatherData });
  } catch (error) {
    console.error(error);
    showError(error.message || "The forecast could not be loaded. Please try again.");
  }
}

async function getCoordinatesForZip(zipCode) {
  const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
  if (response.status === 404) throw new Error(`We could not find ZIP code ${zipCode}.`);
  if (!response.ok) throw new Error(`The location service returned an error (${response.status}).`);

  const data = await response.json();
  const place = data.places[0];
  return {
    city: place["place name"],
    state: place["state abbreviation"],
    latitude: Number(place.latitude),
    longitude: Number(place.longitude),
  };
}

async function getForecastUrls(latitude, longitude) {
  const response = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
  if (!response.ok) throw new Error(`The National Weather Service point lookup failed (${response.status}).`);

  const data = await response.json();
  return {
    forecastUrl: data.properties.forecast,
    hourlyForecastUrl: data.properties.forecastHourly,
    gridId: data.properties.gridId,
    gridX: data.properties.gridX,
    gridY: data.properties.gridY,
  };
}

async function getForecast(forecastUrl) {
  const response = await fetch(forecastUrl);
  if (!response.ok) throw new Error(`The National Weather Service forecast failed (${response.status}).`);
  return response.json();
}

// AI-generated code starts here
// Teacher prompt: Remove the finished forecast design and display raw JSON for students to use.
function renderForecast({ weatherData }) {
  // Replace this raw output with your own selection and presentation of the data.
  rawDataElement.textContent = JSON.stringify(weatherData, null, 2);
  statusElement.textContent = "Forecast data loaded.";
  weatherSection.hidden = false;
}

function showLoading(message) {
  weatherSection.hidden = true;
  statusElement.textContent = message;
}

function showError(message) {
  weatherSection.hidden = true;
  statusElement.textContent = message;
}
// AI-generated code ends here
