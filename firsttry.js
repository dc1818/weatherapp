let latlong = {latitude:'',longitude:''};
let weatherapitemplate = "http://api.openweathermap.org/data/2.5/weather?";

let apikey = "appid=7fd6134c87aae4d32950a7fe165d2651";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position)
{
  latlong.latitude= position.coords.latitude;
  latlong.longitude = position.coords.longitude;
}
getLocation();


async function getWeatherData()
{
  let lat = latlong.latitude;
  let long = latlong.longitude;
  const response = await fetch('https://api.weather.gov/points/39.7456,-97.0892');
  const weatherData = await response.json();
  return weatherData;
}

console.log(getWeatherData());
