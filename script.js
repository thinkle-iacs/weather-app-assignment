// Starter scaffold revised by Tom Hinkle with OpenAI Codex; see citations.html.
const form = document.querySelector("#location-form");
const zipInput = document.querySelector("#zip-code");
const statusElement = document.querySelector("#status");
const weatherSection = document.querySelector("#weather");
const placeNameElement = document.querySelector("#place-name");
const updatedTimeElement = document.querySelector("#updated-time");
const forecastListElement = document.querySelector("#forecast-list");

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
    renderForecast({ location, point, weatherData });
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

function renderForecast({ location, point, weatherData }) {
  const periods = weatherData.properties.periods.slice(0, 6);
  placeNameElement.textContent = `${location.city}, ${location.state}`;
  // AI-generated code starts here
  // Teacher prompt: Fix the invalid time value that prevents forecasts from displaying.
  const updated = formatDate(weatherData.properties.updateTime);
  updatedTimeElement.textContent = updated ? `Updated ${updated}` : "Update time unavailable";
  // AI-generated code ends here
  forecastListElement.replaceChildren(...periods.map(createForecastCard));

  // Useful starting points for experiments with hourly forecasts or grids.
  console.log("Resolved NWS point:", point);
  console.log("Full forecast response:", weatherData);
  statusElement.replaceChildren();
  weatherSection.hidden = false;
}

function createForecastCard(period) {
  const article = document.createElement("article");
  article.className = "forecast-card";
  const heading = document.createElement("h3");
  heading.textContent = period.name;
  const icon = document.createElement("img");
  icon.src = period.icon;
  icon.alt = "";
  icon.width = 86;
  icon.height = 86;
  const temperature = document.createElement("p");
  temperature.className = "temperature";
  temperature.textContent = `${period.temperature}°${period.temperatureUnit}`;
  const summary = document.createElement("p");
  summary.textContent = period.shortForecast;
  article.append(heading, icon, temperature, summary);
  return article;
}

function showLoading(message) {
  weatherSection.hidden = true;
  statusElement.className = "status loading";
  statusElement.replaceChildren();
  const spinner = document.createElement("span");
  spinner.className = "spinner";
  spinner.setAttribute("aria-hidden", "true");
  const text = document.createElement("p");
  text.textContent = message;
  statusElement.append(spinner, text);
}

function showError(message) {
  weatherSection.hidden = true;
  statusElement.className = "status error";
  statusElement.textContent = message;
}

// AI-generated code starts here
// Teacher prompt: Fix the invalid time value that prevents forecasts from displaying.
function formatDate(isoDate) {
  if (typeof isoDate !== "string" || !isoDate.trim()) return "";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
}
// AI-generated code ends here
