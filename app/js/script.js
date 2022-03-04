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

  console.log(response.data);

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
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        navigator.geolocation.showError(error)
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
  console.log(position);
  latitude = parseInt(position.coords.latitude);
  longitude = parseInt(position.coords.longitude);
  callApiWeather();
}


function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
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

getLocation();
