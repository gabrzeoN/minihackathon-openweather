let latitude = null;
let longitude = null;

function callApiWeather() {
  const promise = axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=80a839bb2d8a77c600954c9c171bd4a5`);

  promise.then((response) => createHTML(response));
}

function createHTML(response) {
  const wheatherInformation = document.querySelector(".weather");
  const cityName = response.data.name;
  const cityTemperature = response.data.main.temp;
  const iconWheather = response.data.weather[0].icon;

  wheatherInformation.innerHTML = `
      <h2>${cityName}</h2>
    <div>
      <img src="http://openweathermap.org/img/wn/${iconWheather}@2x.png" alt="" />
      <p>${cityTemperature}ºC</p>
    </div>
    `;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log(position);
  latitude = (position.coords.latitude);
  longitude = (position.coords.longitude);
  callApiWeather();
}


function showError(error) {
  showLocationSearch();
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("Usuario Negou a Permissão");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}

function showLocationSearch() {
  document.querySelector(".search").classList.remove("hidden");
}

function searchLocation() {
  const cityName = document.getElementById("cityName").value;
  const countryCode = document.getElementById("countryCode").value;
  console.log(cityName);

  const promise = axios
    .get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=5&appid=80a839bb2d8a77c600954c9c171bd4a5
  `);

  promise.then(convertGeolocation);
}

function convertGeolocation(response) {
  console.log(response.data);
  latitude = (response.data[0].lat);
  console.log(latitude);
  longitude = (response.data[0].lon);
  console.log(longitude);
  callApiWeather();
}

getLocation();
