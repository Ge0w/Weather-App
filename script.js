const apiKey = "dc5ccd32a8df91c843db8202bfff0abe";

//Create and append DOM elements
const weatherInfo = document.createElement("img");
const tempInfo = document.createElement("div");

const locationHeader = document.createElement("div");
const locationHeaderContainer = document.createElement("div");
locationHeaderContainer.classList.add("header");
locationHeader.classList.add("flex");

const locationInput = document.createElement("input");
locationInput.placeholder = "Location";
let locationValue = "London";

const currentLocation = document.createElement("h1");
currentLocation.textContent = locationValue;

const form = document.createElement("form");

const button = document.createElement("button");
button.textContent = "Go";
button.classList.add("btn");

const content = document.querySelector("#content");
content.append(locationHeaderContainer);
locationHeaderContainer.append(locationHeader);
locationHeader.append(form);
form.append(locationInput);
form.append(button);
locationHeader.append(currentLocation);
content.append(weatherInfo);
content.append(tempInfo);

//Celcius converter utility function
const celciusConverter = (kelvin) => {
  return Math.round(kelvin - 273.15);
};

//Fetch initial open weather map API
fetch(
  `http://api.openweathermap.org/data/2.5/weather?q=${locationValue}&APPID=${apiKey}`,
  { mode: "cors" }
)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    weatherInfo.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
    tempInfo.textContent = `${celciusConverter(response.main.temp)} °C`;
  });

//Capitalise first character utility function
function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Fetch new town / city from open weather map API
form.addEventListener("submit", (e) => {
  e.preventDefault();
  locationValue = `${capitaliseFirstLetter(locationInput.value)}`;
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${locationValue}&APPID=${apiKey}`,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      weatherInfo.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
      tempInfo.textContent = `${celciusConverter(response.main.temp)} °C`;
      currentLocation.textContent = locationValue;
      locationInput.value = "";
    })
    .catch(function (err) {
      alert("Enter Town or City Name");
    });
});
