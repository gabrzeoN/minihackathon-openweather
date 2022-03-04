function callApiWeather() {
    const promise = axios
        .get("api.openweathermap.org/data/2.5/weather?lat=35&lon=139&units=metric&appid=80a839bb2d8a77c600954c9c171bd4a5");

    promise.then((response) => createHTML(response));
}

function createHTML(response) {
    const wheatherInformation = document.querySelector(".weather");
    const cityName = response.list[0].name;
    const cityTemperature = response.list[1].main.temp;

    wheatherInformation.innerHTML(`
    <h2>${cityName}</h2>
      <div>
        <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="" />
        <p>${cityTemperature}</p>
      </div>
    `)
}
